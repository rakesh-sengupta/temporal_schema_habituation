/* =====================================================================
   experiment.js  —  Temporal Schema Habituation & Adaptive Binding
   Computational Cognition Laboratory, Krea University
   Engine for the proposal by Catherine Jaison (supervisor: R. Sengupta)

   You normally do NOT need to edit this file to change materials —
   edit stimuli.js instead. Things you MIGHT tune here are grouped in
   the CONFIG block immediately below.
   ===================================================================== */

/* ----------------------------- CONFIG ----------------------------- */
const CONFIG = {
  fixation_ms: 500,
  isi_min_ms: 400,          // jittered inter-sentence interval
  isi_max_ms: 900,
  iti_min_ms: 1000,         // jittered inter-trial interval
  iti_max_ms: 1500,
  reading_floor_ms: 1500,   // total story RT below this is flagged (§4.9)
  sentence_ceiling_ms: 10000, // any single sentence RT above this is excluded (§5.1)
  confidence_labels: ["Guess", "Low", "Medium", "High"],
  pairs: ["S1-S2", "S2-S3", "S1-S3"],

  // ---- DataPipe / OSF ----
  // Paste the Experiment ID from your DataPipe dashboard here (see README §11).
  datapipe_experiment_id: "y60zFSDsto4Z"
};

/* ------------------------- jsPsych setup -------------------------- */
const jsPsych = initJsPsych({
  display_element: "jspsych-target",
  on_finish: function () { showCompletionScreen(); }
});

/* ----- participant id + counterbalancing group (overridable by URL) ----- */
function makeSubjectId() {
  return "S" + Date.now().toString(36) + "-" +
         Math.random().toString(36).slice(2, 7);
}
const urlSubject = jsPsych.data.getURLVariable("id");
const urlGroup = parseInt(jsPsych.data.getURLVariable("group"), 10);

// ?save=off disables the OSF upload (use this for local testing so you don't
// fill your OSF component with junk runs). Defaults to ON.
const SAVE_ENABLED = (jsPsych.data.getURLVariable("save") !== "off") &&
  CONFIG.datapipe_experiment_id &&
  CONFIG.datapipe_experiment_id.indexOf("REPLACE") === -1;

const SUBJECT_ID = urlSubject || makeSubjectId();
// 4 counterbalancing groups (proposal §4.6). One full block = 4 participants.
const GROUP = (urlGroup >= 1 && urlGroup <= 4) ? urlGroup
            : jsPsych.randomization.randomInt(1, 4);

jsPsych.data.addProperties({
  subject_id: SUBJECT_ID,
  cb_group: GROUP,
  experiment: "temporal_schema_habituation",
  version: "1.0"
});

/* --------------------------- helpers ------------------------------ */
const jitter = (lo, hi) => () => jsPsych.randomization.randomInt(lo, hi);

function wrapSentence(text) {
  return `<div class="story-box">
            <div class="story-sentence">${text}</div>
            <div class="advance-hint">press <span class="key">space</span> to continue</div>
          </div>`;
}

// constrained shuffle: no `key` value repeats within `window` consecutive items
function constrainedShuffle(arr, key, windowSize = 3, tries = 3000) {
  for (let t = 0; t < tries; t++) {
    const s = jsPsych.randomization.shuffle(arr);
    let ok = true;
    for (let i = 0; i < s.length && ok; i++) {
      for (let j = Math.max(0, i - (windowSize - 1)); j < i; j++) {
        if (s[i][key] === s[j][key]) { ok = false; break; }
      }
    }
    if (ok) return s;
  }
  return jsPsych.randomization.shuffle(arr); // fallback
}

/* ---------------------- trial constructors ----------------------- */
function fixation() {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div class="fixation">+</div>',
    choices: "NO_KEYS",
    trial_duration: CONFIG.fixation_ms,
    data: { task: "fixation" }
  };
}
function blankInterval(taskName, lo, hi) {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div class="blank"></div>',
    choices: "NO_KEYS",
    trial_duration: jitter(lo, hi),
    data: { task: taskName }
  };
}
function readTrial(text, dataObj) {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: wrapSentence(text),
    choices: [" "],
    data: Object.assign({ task: "read", sentence_text: text }, dataObj)
  };
}

/* one self-paced 3-sentence story (used in both phases) */
function storyReadingTimeline(sentences, baseData) {
  const tl = [fixation()];
  sentences.forEach((sent, idx) => {
    tl.push(readTrial(sent, Object.assign({ sentence_pos: idx + 1 }, baseData)));
    if (idx < sentences.length - 1) {
      tl.push(blankInterval("isi", CONFIG.isi_min_ms, CONFIG.isi_max_ms));
    }
  });
  return tl;
}

/* temporal-order judgement + confidence for a test story */
function orderAndConfidence(story) {
  const s = [story.s1, story.s2, story.s3]; // s[0..2]
  let aIdx, bIdx;                            // indices of the two probed sentences
  if (story.pair === "S1-S2") { aIdx = 0; bIdx = 1; }
  else if (story.pair === "S2-S3") { aIdx = 1; bIdx = 2; }
  else { aIdx = 0; bIdx = 2; }               // S1-S3
  const earlierIdx = Math.min(aIdx, bIdx);
  const laterIdx = Math.max(aIdx, bIdx);

  // place earlier event on left or right (counterbalanced)
  const earlierOnLeft = story.placeEarlierLeft;
  const leftText  = earlierOnLeft ? s[earlierIdx] : s[laterIdx];
  const rightText = earlierOnLeft ? s[laterIdx]  : s[earlierIdx];
  const correctResponse = earlierOnLeft ? 0 : 1; // button index of the earlier event

  const orderData = {
    task: "order",
    story_id: story.id,
    domain: story.domain,
    condition: story.condition,
    pair_tested: story.pair,
    earlier_on_left: earlierOnLeft ? 1 : 0,
    correct_response: correctResponse,
    is_attention_check: story.is_attention_check ? 1 : 0
  };

  const orderTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<div class="question">Which event happened <b>first</b> in the story?</div>`,
    choices: [leftText, rightText],
    button_html: '<button class="jspsych-btn order-option">%choice%</button>',
    margin_vertical: "10px",
    data: orderData,
    on_finish: (d) => { d.order_correct = (d.response === d.correct_response) ? 1 : 0; }
  };

  const confTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<div class="question">How confident are you in that answer?</div>`,
    choices: CONFIG.confidence_labels,
    button_html: '<button class="jspsych-btn conf-option">%choice%</button>',
    data: {
      task: "confidence",
      story_id: story.id,
      condition: story.condition,
      is_attention_check: story.is_attention_check ? 1 : 0
    },
    on_finish: (d) => {
      d.confidence_label = CONFIG.confidence_labels[d.response];
      d.confidence_level = d.response + 1; // Guess=1 ... High=4
      if (d.is_attention_check === 1) {
        d.attention_passed = (d.confidence_label === "Guess") ? 1 : 0;
      }
    }
  };

  return [orderTrial, confTrial];
}

/* ----------------------- build the phases ------------------------ */

// Phase 1: 24 congruent stories, domain-spaced
function buildHabituation() {
  const ordered = constrainedShuffle(STIMULI.habituation, "domain", 3);
  const tl = [];
  ordered.forEach((story, i) => {
    const base = {
      phase: "habituation",
      story_id: story.id,
      domain: story.domain,
      condition: "cong",
      habituation_index: i + 1,   // 1..24 — used for the habituation curve (H1)
      test_index: null,
      pair_tested: null,
      is_attention_check: 0
    };
    tl.push(...storyReadingTimeline([story.s1, story.s2, story.s3], base));
    tl.push(blankInterval("iti", CONFIG.iti_min_ms, CONFIG.iti_max_ms));
  });
  return tl;
}

// Phase 2: 16 frames -> 8 congruent + 8 oddball, with pair & side counterbalancing
function buildTest() {
  const frames = STIMULI.test.slice(); // fixed order 0..15
  const setRotateA = (GROUP === 1 || GROUP === 2); // first half congruent for groups 1,2
  const acIds = STIMULI.attention_check_ids || [];

  let prepared = frames.map((f, i) => {
    const inFirstHalf = i < 8;
    const condition = setRotateA
      ? (inFirstHalf ? "cong" : "odd")
      : (inFirstHalf ? "odd"  : "cong");
    const s3 = condition === "cong" ? f.s3_congruent : f.s3_oddball;

    const isAC = acIds.indexOf(f.id) !== -1;
    // attention-check frames: replace S3 with the instruction; force a non-S3 pair
    const pair = isAC ? "S1-S2" : CONFIG.pairs[(i + (GROUP - 1)) % 3];
    const placeEarlierLeft = ((i + GROUP) % 2) === 0;

    return {
      id: f.id,
      domain: f.domain,
      s1: f.s1,
      s2: f.s2,
      s3: isAC ? STIMULI.attention_check_sentence : s3,
      condition: condition,
      oddball_type: condition === "odd" ? (f.oddball_type || "NA") : "NA",
      pair: pair,
      placeEarlierLeft: placeEarlierLeft,
      is_attention_check: isAC
    };
  });

  prepared = jsPsych.randomization.shuffle(prepared); // intermix cong/odd (§4.4)

  const tl = [];
  prepared.forEach((story, i) => {
    const base = {
      phase: "test",
      story_id: story.id,
      domain: story.domain,
      condition: story.condition,
      oddball_type: story.oddball_type,
      habituation_index: null,
      test_index: i + 1,
      pair_tested: story.pair,
      is_attention_check: story.is_attention_check ? 1 : 0
    };
    tl.push(...storyReadingTimeline([story.s1, story.s2, story.s3], base));
    tl.push(...orderAndConfidence(story));
    tl.push(blankInterval("iti", CONFIG.iti_min_ms, CONFIG.iti_max_ms));
  });
  return tl;
}

/* --------------------- instruction / text screens ------------------ */
const pressToContinue = '<div class="advance-hint">press the <span class="key">space</span> bar to continue</div>';

function infoScreen(html) {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div class="textpage">${html}${pressToContinue}</div>`,
    choices: [" "]
  };
}

/* --------------------------- consent ------------------------------ */
const consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="textpage consent">
      <h1>Informed Consent</h1>
      <p><b>Study:</b> Reading and memory for short everyday stories.</p>
      <p><b>Researchers:</b> Catherine Jaison &amp; Dr. Rakesh Sengupta,
         Computational Cognition Laboratory, School of Interwoven Arts and
         Sciences, Krea University.</p>

      <h3>What you will do</h3>
      <p>You will read a series of very short, three-sentence stories at your
         own pace, pressing the space bar to move from one sentence to the
         next. For some stories you will then answer a brief question about the
         order of events and rate how confident you are. The session takes about
         <b>30&ndash;35 minutes</b>.</p>

      <h3>Risks and benefits</h3>
      <p>There are no anticipated risks beyond those of ordinary computer use.
         There is no direct benefit to you; the study advances understanding of
         how people read and remember everyday events.</p>

      <h3>Privacy</h3>
      <p>We collect <b>no</b> names, email addresses, or IP addresses. Your data
         are stored under an anonymous code only. De-identified data may be
         shared publicly for research transparency.</p>

      <h3>Voluntary participation</h3>
      <p>Participation is voluntary. You may stop at any time by closing the
         browser tab, without penalty. You must be <b>18 years or older</b> to
         take part.</p>

      <p style="margin-top:18px;">By clicking <b>"I agree"</b> you confirm that
         you are at least 18, that you have read and understood this information,
         and that you consent to take part.</p>
    </div>`,
  choices: ["I agree", "I do not agree"],
  button_html: '<button class="jspsych-btn consent-btn">%choice%</button>',
  data: { task: "consent" },
  on_finish: (d) => {
    d.consented = (d.response === 0) ? 1 : 0;
    if (d.response === 1) {
      jsPsych.abortExperiment(
        `<div class="textpage"><h2>Thank you</h2>
         <p>You chose not to take part. You may now close this tab.</p></div>`
      );
    }
  }
};

const welcome = infoScreen(`
  <h1>Welcome</h1>
  <p>Thank you for taking part. Please read each screen carefully.</p>
  <p>Find a quiet place, silence notifications, and try to complete the study
     in one sitting without interruptions.</p>`);

const phase1Instructions = infoScreen(`
  <h2>Part 1 &mdash; Reading</h2>
  <p>You will read a series of short stories, one sentence at a time.</p>
  <p>Read each sentence <b>carefully and at your natural pace</b>. When you have
     read and understood a sentence, press the <span class="key">space</span> bar
     to bring up the next one.</p>
  <p>There are no questions in this part &mdash; just read.</p>`);

const phase2Instructions = infoScreen(`
  <h2>Part 2 &mdash; Reading and a short question</h2>
  <p>You will now read a few more short stories in the same way, one sentence at
     a time, pressing <span class="key">space</span> to advance.</p>
  <p><b>After each story</b> we will show you two of its sentences and ask which
     event happened <b>first</b>. Then you will rate how confident you are in
     your answer.</p>
  <p>Answer based only on the story you have just read. There is no time limit on
     the question.</p>`);

/* ------------------ demographics + awareness (§4.9) ---------------- */
const awarenessAndDemographics = {
  type: jsPsychSurveyHtmlForm,
  preamble: `<div class="textpage"><h2>Almost done</h2>
             <p>A few final questions. Your answers are anonymous.</p></div>`,
  html: `
    <div class="form-block">
      <label>1. Before we told you, did you notice anything about the
        <b>order of events</b> or the <b>structure</b> of the stories?</label><br>
      <label class="inline"><input type="radio" name="aware" value="yes" required> Yes</label>
      <label class="inline"><input type="radio" name="aware" value="no"> No</label>
    </div>
    <div class="form-block">
      <label>2. If yes, what did you notice? (optional)</label><br>
      <textarea name="aware_text" rows="3" cols="50" placeholder="In your own words..."></textarea>
    </div>
    <div class="form-block">
      <label>3. Your age (years):</label>
      <input name="age" type="number" min="18" max="120" required style="width:80px;">
    </div>
    <div class="form-block">
      <label>4. Gender:</label>
      <select name="gender" required>
        <option value="" disabled selected>Choose...</option>
        <option value="woman">Woman</option>
        <option value="man">Man</option>
        <option value="nonbinary">Non-binary / another term</option>
        <option value="no_answer">Prefer not to say</option>
      </select>
    </div>
    <div class="form-block">
      <label>5. Is English your first / native language?</label><br>
      <label class="inline"><input type="radio" name="native_en" value="yes" required> Yes</label>
      <label class="inline"><input type="radio" name="native_en" value="no"> No</label>
    </div>`,
  button_label: "Finish",
  data: { task: "demographics" }
};

/* ------------------ DataPipe upload to OSF (§11 of README) --------- */
const OSF_FILENAME = `temporal_schema_${SUBJECT_ID}_g${GROUP}.csv`;

const saveToOSF = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: CONFIG.datapipe_experiment_id,
  filename: OSF_FILENAME,
  data_string: () => jsPsych.data.get().csv()
};

/* --------------------------- timeline ---------------------------- */
const timeline = [];
timeline.push(consent);
timeline.push(welcome);
timeline.push(phase1Instructions);
timeline.push(...buildHabituation());
timeline.push(phase2Instructions);
timeline.push(...buildTest());
timeline.push(awarenessAndDemographics);
if (SAVE_ENABLED) {
  timeline.push(infoScreen(`<h2>Saving your responses</h2>
    <p>Please wait a moment and <b>do not close this tab</b>. Your responses are
    being saved to our secure research server.</p>`));
  timeline.push(saveToOSF);
}

jsPsych.run(timeline);

/* =====================================================================
   DATA EXPORT + LIVE DESCRIPTIVE SUMMARY (shown at the very end)
   ===================================================================== */
function triggerDownload(filename, text) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

const mean = (xs) => xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN;
function olsSlope(xs, ys) {
  const n = xs.length; if (n < 2) return NaN;
  const mx = mean(xs), my = mean(ys);
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) { num += (xs[i] - mx) * (ys[i] - my); den += (xs[i] - mx) ** 2; }
  return den === 0 ? NaN : num / den;
}
const r2 = (x) => Number.isFinite(x) ? Math.round(x * 100) / 100 : "NA";

function computeSummary() {
  const all = jsPsych.data.get();
  const reads = all.filter({ task: "read" }).values();
  const orders = all.filter({ task: "order" }).values();
  const confs = all.filter({ task: "confidence" }).values();

  // ---- per-story total reading time + reading-floor flag ----
  const storyTotals = {}; // key: phase|story|test_index
  reads.forEach(r => {
    const key = r.phase + "|" + r.story_id + "|" + (r.test_index ?? r.habituation_index);
    storyTotals[key] = (storyTotals[key] || 0) + (r.rt || 0);
  });
  const flooredStories = Object.values(storyTotals).filter(t => t < CONFIG.reading_floor_ms).length;

  // ---- habituation curve (H1): S3 RT vs trial index ----
  const habS3 = reads.filter(r => r.phase === "habituation" && r.sentence_pos === 3);
  const habX = habS3.map(r => r.habituation_index);
  const habY = habS3.map(r => r.rt);
  const habSlope = olsSlope(habX, habY);

  // ---- H2: test S3 reading time by condition (exclude attention checks) ----
  const testS3 = reads.filter(r => r.phase === "test" && r.sentence_pos === 3 && r.is_attention_check !== 1);
  const rtCong = testS3.filter(r => r.condition === "cong").map(r => r.rt);
  const rtOdd  = testS3.filter(r => r.condition === "odd").map(r => r.rt);

  // ---- H3: order accuracy by condition (and by condition x pair) ----
  const realOrders = orders.filter(o => o.is_attention_check !== 1);
  const accBy = (cond) => {
    const v = realOrders.filter(o => o.condition === cond).map(o => o.order_correct);
    return v.length ? mean(v) : NaN;
  };
  const accByPair = (cond, pair) => {
    const v = realOrders.filter(o => o.condition === cond && o.pair_tested === pair).map(o => o.order_correct);
    return { n: v.length, acc: v.length ? mean(v) : NaN };
  };

  // ---- H4: confidence by condition ----
  const realConf = confs.filter(c => c.is_attention_check !== 1);
  const confCond = (cond) => {
    const v = realConf.filter(c => c.condition === cond).map(c => c.confidence_level);
    return v.length ? mean(v) : NaN;
  };

  // ---- attention checks ----
  const acRows = confs.filter(c => c.is_attention_check === 1);
  const acPassed = acRows.filter(c => c.attention_passed === 1).length;

  // ---- build CSV ----
  const L = [];
  L.push(["metric", "value"]);
  L.push(["subject_id", SUBJECT_ID]);
  L.push(["cb_group", GROUP]);
  L.push(["n_read_trials", reads.length]);
  L.push(["n_stories_total", Object.keys(storyTotals).length]);
  L.push(["n_stories_below_reading_floor", flooredStories]);
  L.push(["attention_checks_total", acRows.length]);
  L.push(["attention_checks_passed", acPassed]);
  L.push(["--- H1 habituation curve ---", ""]);
  L.push(["hab_S3_mean_rt_ms", r2(mean(habY))]);
  L.push(["hab_S3_rt_slope_ms_per_trial", r2(habSlope)]);
  L.push(["hab_S3_first6_mean_ms", r2(mean(habY.slice(0, 6)))]);
  L.push(["hab_S3_last6_mean_ms", r2(mean(habY.slice(-6)))]);
  L.push(["--- H2 violation cost (test S3 RT) ---", ""]);
  L.push(["test_S3_rt_congruent_ms", r2(mean(rtCong))]);
  L.push(["test_S3_rt_oddball_ms", r2(mean(rtOdd))]);
  L.push(["test_S3_oddball_minus_congruent_ms", r2(mean(rtOdd) - mean(rtCong))]);
  L.push(["--- H3 order memory accuracy ---", ""]);
  L.push(["order_acc_congruent", r2(accBy("cong"))]);
  L.push(["order_acc_oddball", r2(accBy("odd"))]);
  CONFIG.pairs.forEach(p => {
    const c = accByPair("cong", p), o = accByPair("odd", p);
    L.push([`order_acc_cong_${p} (n=${c.n})`, r2(c.acc)]);
    L.push([`order_acc_odd_${p} (n=${o.n})`, r2(o.acc)]);
  });
  L.push(["--- H4 confidence ---", ""]);
  L.push(["confidence_congruent_1to4", r2(confCond("cong"))]);
  L.push(["confidence_oddball_1to4", r2(confCond("odd"))]);

  const csv = L.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

  // small HTML preview table
  const previewRows = L.map(r =>
    `<tr><td>${r[0]}</td><td style="text-align:right;">${r[1]}</td></tr>`
  ).join("");
  return { csv, previewRows };
}

function showCompletionScreen() {
  const rawCsv = jsPsych.data.get().csv();
  const rawName = `temporal_schema_${SUBJECT_ID}.csv`;
  const { csv: summaryCsv, previewRows } = computeSummary();
  const summaryName = `temporal_schema_${SUBJECT_ID}_summary.csv`;

  const target = document.getElementById("jspsych-target") || document.body;
  const savedNote = SAVE_ENABLED
    ? `<p>Your responses have been <b>saved to our secure research server</b>.
         You can also keep a local copy below.</p>`
    : `<p><b>Local-test mode</b> (OSF upload off). Download your data below.</p>`;
  target.innerHTML = `
    <div class="textpage done">
      <h1>All done &mdash; thank you!</h1>
      ${savedNote}
      <p class="subjcode">Your anonymous code: <b>${SUBJECT_ID}</b> &nbsp;|&nbsp; group ${GROUP}</p>

      <div class="dl-buttons">
        <button id="dl-raw" class="jspsych-btn primary">Download raw data (CSV)</button>
        <button id="dl-sum" class="jspsych-btn">Download descriptive summary (CSV)</button>
        <button id="toggle-sum" class="jspsych-btn ghost">Show / hide summary</button>
      </div>

      <div id="summary-preview" class="summary-preview" style="display:none;">
        <h3>Quick descriptive summary (this participant only)</h3>
        <p class="note">For a sanity check only &mdash; the real analysis runs in R on the pooled,
          de-identified data (proposal §5).</p>
        <table class="summary-table">${previewRows}</table>
      </div>

      <p class="note" style="margin-top:24px;">You may now close this tab.</p>
    </div>`;

  document.getElementById("dl-raw").onclick = () => triggerDownload(rawName, rawCsv);
  document.getElementById("dl-sum").onclick = () => triggerDownload(summaryName, summaryCsv);
  document.getElementById("toggle-sum").onclick = () => {
    const el = document.getElementById("summary-preview");
    el.style.display = (el.style.display === "none") ? "block" : "none";
  };

  // In local-test mode, auto-offer the raw file. For real participants the data
  // are already on OSF, so we don't push a download at them (buttons stay available).
  if (!SAVE_ENABLED) {
    try { triggerDownload(rawName, rawCsv); } catch (e) { /* fall back to button */ }
  }
}
