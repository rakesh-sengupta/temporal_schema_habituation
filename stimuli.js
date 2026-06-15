/* =====================================================================
   stimuli.js  —  Schema Habituation & Event-Order Binding experiment
   Computational Cognition Laboratory, Krea University
   ---------------------------------------------------------------------
   THIS IS THE FILE YOU EDIT during stimulus construction.
   You should NOT need to touch experiment.js to change the materials.

   Schema:  Activity-Start  ->  Tool-Use  ->  Result

   WHAT CHANGED FROM THE EARLY DRAFT (to match the registered protocol):
   1. The test bank is now 32 ANALYSED frames (was 16), split into four
      counterbalancing sets A/B/C/D of 8 frames each. The engine rotates
      which whole sets are shown congruent vs oddball (see Table 1 in the
      Registered Report), so every frame serves both roles across the sample.
   2. Each test frame has a FIXED `probe_pair`: 24 frames are tested on the
      adjacent S2-S3 pair (the critical pair), 8 on the S1-S2 control pair.
      The distant S1-S3 pair has been dropped. Within every set there are
      6 S2-S3 frames and 2 S1-S2 frames, which keeps each participant's
      cells balanced (12 cong / 12 odd on S2-S3; 4 / 4 on S1-S2).
   3. The oddball third sentence is now a SINGLE homogeneous type:
      a locally plausible observation about the SETTING or the agent's
      STATE that does NOT deliver the goal-completing Result. We no longer
      use "another tool-use" oddballs (those extend the schema rather than
      violating it) or "activity-start" oddballs.
   4. Attention checks are now 2 DEDICATED frames (below), separate from the
      32 analysed frames, so they no longer cannibalise analysed trials.

   NORMING (still required before any real data — proposal/RR):
     - congruent third: plausibility >= 5/7 AND typicality >= 5/7
     - oddball third:   plausibility >= 4/7 AND typicality <= 3/7
     Anything in the 3-5 typicality grey zone is revised/replaced and re-normed.

   *** STATUS OF MATERIALS ***
   Frames T01-T16 are the converted originals (oddballs rewritten to the
   single setting/state type). Frames T17-T32 are DRAFT SEEDS written to
   complete the registered 32-frame bank; like all oddball thirds they are
   UNNORMED and must be normed and PI-approved (and freely rewritten) before
   data collection. Treat every third sentence here as a seed, not a final.
   ===================================================================== */

window.STIMULI = {

  /* ---------------------------------------------------------------
     HABITUATION SET — 24 schema-congruent stories (12 domains x 2)
     --------------------------------------------------------------- */
  habituation: [
    { id: "H01", domain: "kitchen",   s1: "Raj saw the boiling water on the stove.",          s2: "He added the tea leaves to the pot.",          s3: "He poured himself a perfect cup of tea." },
    { id: "H02", domain: "kitchen",   s1: "Priya sat down at the kitchen table.",             s2: "She chopped the onions with a sharp knife.",    s3: "The vegetables were soon ready for the curry." },
    { id: "H03", domain: "office",    s1: "Vikram opened the laptop on his desk.",            s2: "He typed the report into the open document.",   s3: "He emailed the finished file to his manager." },
    { id: "H04", domain: "office",    s1: "Rohit cleared the clutter from his desk.",         s2: "He sorted the papers into labelled folders.",   s3: "His workspace looked clean and well organised." },
    { id: "H05", domain: "garage",    s1: "Arun walked into the dimly lit garage.",           s2: "He loosened the bolt with his wrench.",         s3: "The bicycle wheel finally came off cleanly." },
    { id: "H06", domain: "garage",    s1: "Manoj opened the bonnet of the car.",              s2: "He tightened the loose cap by hand.",           s3: "The engine started smoothly on the first try." },
    { id: "H07", domain: "studio",    s1: "Mira stood in the bright art studio.",             s2: "She dipped her brush into the blue paint.",     s3: "The canvas slowly filled with vivid colour." },
    { id: "H08", domain: "studio",    s1: "Karan set the camera on its tripod.",              s2: "He aimed the lens toward the busy street.",     s3: "He captured a sharp picture of the crowd." },
    { id: "H09", domain: "market",    s1: "Ravi entered the small corner grocery store.",     s2: "He filled a basket with fresh vegetables.",     s3: "He walked home with a heavy shopping bag." },
    { id: "H10", domain: "market",    s1: "Salim stopped at the busy fish stall.",            s2: "He weighed the morning catch on the scale.",    s3: "He packed the fish into crushed ice." },
    { id: "H11", domain: "classroom", s1: "Sneha opened her textbook on the desk.",           s2: "She underlined the key formulas with her pen.", s3: "She felt prepared for the morning exam." },
    { id: "H12", domain: "classroom", s1: "Lata gathered her notes at the table.",            s2: "She wrote the essay in her notebook.",          s3: "She handed the finished pages to her teacher." },
    { id: "H13", domain: "garden",    s1: "Hari knelt beside the dry flower bed.",            s2: "He watered the seedlings with a small can.",    s3: "The little plants stood fresh and green." },
    { id: "H14", domain: "garden",    s1: "Geeta stepped into the morning vegetable garden.", s2: "She picked the ripe tomatoes into a bowl.",     s3: "She carried the full bowl indoors." },
    { id: "H15", domain: "bathroom",  s1: "Divya stood before the bathroom mirror.",          s2: "She combed her hair with a wide comb.",         s3: "She looked tidy and ready for work." },
    { id: "H16", domain: "bathroom",  s1: "Sara filled the bucket with soapy water.",         s2: "She scrubbed the floor with a stiff brush.",    s3: "The tiles gleamed clean under the light." },
    { id: "H17", domain: "workshop",  s1: "Sameer measured the plank on the workbench.",      s2: "He cut the wood with a steady saw.",            s3: "The new shelf fit neatly on the wall." },
    { id: "H18", domain: "workshop",  s1: "Tarun held the loose board in place.",             s2: "He hammered the nails along its edge.",         s3: "The board sat firm against the frame." },
    { id: "H19", domain: "bedroom",   s1: "Aanya stood before the open wardrobe.",            s2: "She took out a freshly pressed shirt.",         s3: "She left the house looking neat." },
    { id: "H20", domain: "bedroom",   s1: "Vivek noticed the creased shirt on the bed.",      s2: "He pressed it flat with the warm iron.",        s3: "The shirt hung crisp and ready to wear." },
    { id: "H21", domain: "library",   s1: "Asha searched along the tall library shelves.",    s2: "She pulled a thick volume from the row.",       s3: "She found the chapter she had sought." },
    { id: "H22", domain: "library",   s1: "Nikhil stacked the borrowed books on the counter.", s2: "He scanned each barcode with the reader.",     s3: "The librarian cleared his account at once." },
    { id: "H23", domain: "lab",       s1: "Doctor Roy entered the cool chemistry lab.",       s2: "He measured the solution into a flask.",        s3: "The mixture turned a bright clean blue." },
    { id: "H24", domain: "lab",       s1: "Megha sat down at the microscope bench.",          s2: "She placed the thin slide under the lens.",     s3: "The cells appeared sharp in her view." }
  ],

  /* ---------------------------------------------------------------
     TEST FRAMES — 32 analysed frames, in four sets A/B/C/D (8 each).
     Per set: 6 frames probed on S2-S3, 2 on S1-S2  (=> 24 + 8 total).
     Each frame carries:
        set         : "A" | "B" | "C" | "D"   (counterbalancing block)
        probe_pair  : "S2-S3" | "S1-S2"        (fixed order pair tested)
        s3_congruent: a proper Result (completes the schema)
        s3_oddball  : a SETTING/STATE observation (does NOT complete it)
        oddball_type: "setting_state" for all (single homogeneous type)
     The engine decides, per participant/group, which whole sets are shown
     congruent vs oddball.  You write BOTH thirds for every frame.
     --------------------------------------------------------------- */
  test: [

    /* ===== SET A (T01-T08): 6x S2-S3, 2x S1-S2 ===== */
    { id: "T01", domain: "kitchen",   set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Meena cracked the eggs into the mixing bowl.", s2: "She whisked the batter with a fork.",
      s3_congruent: "She slid the cake tray into the oven.",
      s3_oddball:   "The kitchen smelled of warm vanilla." },

    { id: "T02", domain: "office",    set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Sanjay opened the file on the office computer.", s2: "He clicked print and waited by the tray.",
      s3_congruent: "He stapled the warm pages into a report.",
      s3_oddball:   "The office was quiet in the early morning." },

    { id: "T03", domain: "garage",    set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Ramesh spread newspaper across the garage floor.", s2: "He shook the can and pressed the nozzle.",
      s3_congruent: "The old stool gleamed with a fresh coat.",
      s3_oddball:   "The garage smelled of paint and petrol." },

    { id: "T04", domain: "studio",    set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Anu sat down at the pottery wheel.", s2: "She pressed her thumbs into the spinning clay.",
      s3_congruent: "A smooth bowl rose under her hands.",
      s3_oddball:   "The studio was dusty with dried clay." },

    { id: "T05", domain: "market",    set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Zoya laid the cloth on the tailor's table.", s2: "She cut the fabric along the chalk line.",
      s3_congruent: "The blouse pieces were ready to be stitched.",
      s3_oddball:   "The shop was lined with colourful spools." },

    { id: "T06", domain: "classroom", set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Aditya stood at the science classroom bench.", s2: "He poured the liquid into the glass beaker.",
      s3_congruent: "The solution fizzed and turned bright green.",
      s3_oddball:   "The classroom was warm and brightly lit." },

    { id: "T07", domain: "garden",    set: "A", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Suresh wheeled the mower onto the lawn.", s2: "He pushed it slowly across the long grass.",
      s3_congruent: "The lawn lay flat and freshly trimmed.",
      s3_oddball:   "The garden was wide and full of birds." },

    { id: "T08", domain: "bathroom",  set: "A", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Naveen leaned toward the foggy mirror.", s2: "He drew the razor along his jaw.",
      s3_congruent: "His face was smooth and clean again.",
      s3_oddball:   "The small bathroom was warm and steamy." },

    /* ===== SET B (T09-T16): 6x S2-S3, 2x S1-S2 ===== */
    { id: "T09", domain: "workshop",  set: "B", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Iqbal placed the circuit board on the mat.", s2: "He touched the hot iron to the joint.",
      s3_congruent: "The wire held firm in a shiny bead.",
      s3_oddball:   "The workbench was crowded with small tools." },

    { id: "T10", domain: "bedroom",   set: "B", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Reena opened the empty suitcase on the bed.", s2: "She folded the clothes into neat piles.",
      s3_congruent: "The packed bag zipped shut with ease.",
      s3_oddball:   "The bedroom was quiet and dimly lit." },

    { id: "T11", domain: "library",   set: "B", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Tanvi gathered the loose sheets on the table.", s2: "She punched holes along the left margin.",
      s3_congruent: "The bound report looked tidy and complete.",
      s3_oddball:   "The reading room was silent and cool." },

    { id: "T12", domain: "lab",       set: "B", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Pooja set the test tubes in the rack.", s2: "She added two drops of the red dye.",
      s3_congruent: "The samples glowed a deep steady red.",
      s3_oddball:   "The lab bench was crowded with glassware." },

    { id: "T13", domain: "kitchen",   set: "B", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Aman dropped the oranges into the juicer.", s2: "He pressed the lid down with both hands.",
      s3_congruent: "A tall glass of fresh juice was ready.",
      s3_oddball:   "The kitchen window looked over the yard." },

    { id: "T14", domain: "office",    set: "B", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Leela opened the parcel at her desk.", s2: "She checked the items against the list.",
      s3_congruent: "She signed the slip and accepted the delivery.",
      s3_oddball:   "The office hummed with quiet activity." },

    { id: "T15", domain: "garden",    set: "B", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Mohit filled the clay pot with dark soil.", s2: "He settled the small fern into the centre.",
      s3_congruent: "The fern stood green in its new pot.",
      s3_oddball:   "The balcony was bright with afternoon sun." },

    { id: "T16", domain: "studio",    set: "B", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Ria placed the print on the cutting board.", s2: "She trimmed the edges with a sharp blade.",
      s3_congruent: "The photo sat neatly inside its frame.",
      s3_oddball:   "The studio smelled faintly of fresh ink." },

    /* ===== SET C (T17-T24): 6x S2-S3, 2x S1-S2  — DRAFT SEEDS, NORM BEFORE USE ===== */
    { id: "T17", domain: "kitchen",   set: "C", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Nisha poured the lentils into the pot.", s2: "She stirred the dal with a ladle.",
      s3_congruent: "The thick dal was ready to serve.",
      s3_oddball:   "The kitchen was warm and full of steam." },

    { id: "T18", domain: "office",    set: "C", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Farah opened the spreadsheet on her monitor.", s2: "She entered the figures into each column.",
      s3_congruent: "The monthly budget balanced to the rupee.",
      s3_oddball:   "The office windows faced the busy road." },

    { id: "T19", domain: "garage",    set: "C", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Dev rolled the flat tyre to the bench.", s2: "He pumped the air into the tube.",
      s3_congruent: "The tyre was firm and ready to fit.",
      s3_oddball:   "The garage was cluttered with old boxes." },

    { id: "T20", domain: "workshop",  set: "C", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Omar clamped the plank to the table.", s2: "He sanded the rough edge with paper.",
      s3_congruent: "The surface felt smooth under his palm.",
      s3_oddball:   "The workshop smelled of sawdust and oil." },

    { id: "T21", domain: "garden",    set: "C", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Bina raked the leaves into a pile.", s2: "She scooped them into a large bag.",
      s3_congruent: "The lawn lay clear and tidy again.",
      s3_oddball:   "The garden was cool in the morning shade." },

    { id: "T22", domain: "lab",       set: "C", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Kabir warmed the culture in the incubator.", s2: "He spread the sample across the dish.",
      s3_congruent: "The colonies grew in neat round spots.",
      s3_oddball:   "The lab was silent except for a hum." },

    { id: "T23", domain: "library",   set: "C", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Anya wheeled the trolley between the aisles.", s2: "She shelved each book in its place.",
      s3_congruent: "The returns cart stood finally empty.",
      s3_oddball:   "The library was quiet and softly lit." },

    { id: "T24", domain: "studio",    set: "C", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Imran stretched the canvas over the frame.", s2: "He stapled the edges tight at the back.",
      s3_congruent: "The blank canvas was ready to paint.",
      s3_oddball:   "The studio was bright with northern light." },

    /* ===== SET D (T25-T32): 6x S2-S3, 2x S1-S2  — DRAFT SEEDS, NORM BEFORE USE ===== */
    { id: "T25", domain: "market",    set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Hina spread the spices across the counter.", s2: "She ground the mix in a stone bowl.",
      s3_congruent: "The fresh masala filled a small jar.",
      s3_oddball:   "The market was loud with morning trade." },

    { id: "T26", domain: "classroom", set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Yash arranged the slides on the projector.", s2: "He focused the image on the screen.",
      s3_congruent: "The diagram appeared crisp for the class.",
      s3_oddball:   "The classroom was lined with old maps." },

    { id: "T27", domain: "bathroom",  set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Rhea filled the basin with cold water.", s2: "She soaked the cloth and wrung it out.",
      s3_congruent: "The mirror wiped clear and bright.",
      s3_oddball:   "The bathroom tiles were cool and pale." },

    { id: "T28", domain: "bedroom",   set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Sahil stripped the sheets from the mattress.", s2: "He spread a fresh cover over the bed.",
      s3_congruent: "The bed looked crisp and freshly made.",
      s3_oddball:   "The bedroom was calm in the evening light." },

    { id: "T29", domain: "kitchen",   set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Tara rinsed the rice in the bowl.", s2: "She set it to cook in the pan.",
      s3_congruent: "The fluffy rice was ready for dinner.",
      s3_oddball:   "The kitchen clock ticked above the door." },

    { id: "T30", domain: "office",    set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Neil gathered the slides for the meeting.", s2: "He loaded the deck onto the laptop.",
      s3_congruent: "The presentation ran without a single glitch.",
      s3_oddball:   "The office was chilly from the vent." },

    { id: "T31", domain: "garage",    set: "D", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Asif lifted the toolbox onto the bench.", s2: "He laid the spanners out in a row.",
      s3_congruent: "The tools were ready for the repair.",
      s3_oddball:   "The garage door stood half open." },

    { id: "T32", domain: "garden",    set: "D", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Lina filled the can at the outdoor tap.", s2: "She walked it over to the flower bed.",
      s3_congruent: "The thirsty plants drank the cool water.",
      s3_oddball:   "The garden hummed with afternoon bees." }
  ],

  /* ---------------------------------------------------------------
     ATTENTION-CHECK FRAMES — 2 DEDICATED frames (separate from the 32).
     The engine replaces the third sentence with `attention_check_sentence`
     and scores only whether the participant complies. These are flagged
     is_attention_check = 1 and excluded from all hypothesis tests.
     Exclude a participant who fails BOTH (sensitivity: fail-either).
     --------------------------------------------------------------- */
  attention_checks: [
    { id: "AC1", domain: "kitchen", s1: "Gita placed the kettle on the stove.",   s2: "She waited for the water to boil." },
    { id: "AC2", domain: "office",  s1: "Mark opened his notebook on the desk.",  s2: "He clicked his pen and looked up." }
  ],
  attention_check_sentence: "For this story, please choose \"Guess\" as your confidence."
};
