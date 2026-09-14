/* =====================================================================
   stimuli.js  —  Schema Habituation & Event-Order Binding experiment
   Computational Cognition Laboratory, Krea University
   ---------------------------------------------------------------------
   Schema:  Activity-Start  ->  Tool-Use  ->  Result

   DESIGN (registered): 32 analysed test frames in four counterbalancing
   sets A/B/C/D (8 each); per set 6 frames probed on S2-S3 + 2 on S1-S2
   (=> 24 S2-S3 + 8 S1-S2). Oddball third = a single homogeneous type: a
   locally plausible, incidental observation of the immediate scene that
   does NOT complete the schema. Plus 2 dedicated attention checks.

   *** STATUS OF MATERIALS (post-norming, N = 15 raters, old 16-frame bank) ***
   Locked filter rule: congruent keep if plausibility>=5 AND typicality>=5;
   oddball keep if plausibility>=4 AND typicality<=3.

   No further norming study is planned; the bank below is finalised by
   informed judgement. Specifically:
     - KEPT AS VALIDATED (met the rule): congruent for all frames except
       T01/T03/T09; oddball for T09, T11, T15 (setting type) and T14.
     - REVISED BY HAND (failed or stale in norming): the three congruent
       near-misses (T01, T03, T09) and the oddballs for T01-T08, T10, T12,
       T13, T16. Revisions follow the norming lesson: avoid oddballs that
       thematically echo the completed action (these read as too typical);
       prefer an incidental, present-in-scene detail (the style of the
       validated keepers T09/T11/T15). These revised thirds are UNNORMED.
     - T14 ODDBALL is kept as its validated sentence, which is a TOOL-USE
       type ("She reached for the scissors in the drawer"). It is therefore
       the ONE non-setting oddball in the bank. A drop-in setting/state
       replacement is given in a comment beside it if single-type
       homogeneity is preferred over keeping this validated item.
     - T17-T32 were never normed (draft seeds); T17 and T20 were adjusted
       to remove thematically-tied endings (the same flaw that failed T03).
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
     TEST FRAMES — 32 analysed frames (sets A-D; 24 S2-S3 + 8 S1-S2)
     oddball_type "setting_state" for all except T14 (see note there)
     --------------------------------------------------------------- */
  test: [

    /* ===== SET A (T01-T08): 6x S2-S3, 2x S1-S2 ===== */
    { id: "T01", domain: "kitchen",   set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Meena cracked the eggs into the mixing bowl.", s2: "She whisked the batter with a fork.",
      s3_congruent: "A soft golden cake was soon ready.",              /* revised: clearer Result */
      s3_oddball:   "Bowls and spoons lay across the counter." },      /* revised: incidental scene */

    { id: "T02", domain: "office",    set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Sanjay opened the file on the office computer.", s2: "He clicked print and waited by the tray.",
      s3_congruent: "He stapled the warm pages into a report.",
      s3_oddball:   "Files and folders covered the wide desk." },      /* revised */

    { id: "T03", domain: "garage",    set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Ramesh spread newspaper across the garage floor.", s2: "He shook the can and pressed the nozzle.",
      s3_congruent: "The old stool shone with fresh paint.",           /* revised: clearer Result */
      s3_oddball:   "Old tins were stacked along the wall." },         /* revised: no paint-smell theme tie */

    { id: "T04", domain: "studio",    set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Anu sat down at the pottery wheel.", s2: "She pressed her thumbs into the spinning clay.",
      s3_congruent: "A smooth bowl rose under her hands.",
      s3_oddball:   "Finished pots lined the low shelf." },            /* revised */

    { id: "T05", domain: "market",    set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Zoya laid the cloth on the tailor's table.", s2: "She cut the fabric along the chalk line.",
      s3_congruent: "The blouse pieces were ready to be stitched.",
      s3_oddball:   "A tape measure lay across the table." },          /* revised */

    { id: "T06", domain: "classroom", set: "A", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Aditya stood at the science classroom bench.", s2: "He poured the liquid into the glass beaker.",
      s3_congruent: "The solution fizzed and turned bright green.",
      s3_oddball:   "Charts and posters covered the side wall." },     /* revised */

    { id: "T07", domain: "garden",    set: "A", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Suresh wheeled the mower onto the lawn.", s2: "He pushed it slowly across the long grass.",
      s3_congruent: "The lawn lay flat and freshly trimmed.",
      s3_oddball:   "Tall hedges bordered the far side." },            /* revised */

    { id: "T08", domain: "bathroom",  set: "A", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Naveen leaned toward the foggy mirror.", s2: "He drew the razor along his jaw.",
      s3_congruent: "His face was smooth and clean again.",
      s3_oddball:   "Spare towels hung on the near rail." },           /* revised */

    /* ===== SET B (T09-T16): 6x S2-S3, 2x S1-S2 ===== */
    { id: "T09", domain: "workshop",  set: "B", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Iqbal placed the circuit board on the mat.", s2: "He touched the hot iron to the joint.",
      s3_congruent: "The soldered joint held firm and secure.",        /* revised: clearer Result */
      s3_oddball:   "The workbench was crowded with small tools." },   /* KEPT: validated (p4.29 t2.43) */

    { id: "T10", domain: "bedroom",   set: "B", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Reena opened the empty suitcase on the bed.", s2: "She folded the clothes into neat piles.",
      s3_congruent: "The packed bag zipped shut with ease.",
      s3_oddball:   "Shoes lay scattered near the door." },            /* revised */

    { id: "T11", domain: "library",   set: "B", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Tanvi gathered the loose sheets on the table.", s2: "She punched holes along the left margin.",
      s3_congruent: "The bound report looked tidy and complete.",
      s3_oddball:   "The reading room was silent and cool." },         /* KEPT: validated (p4.43 t2.14) */

    { id: "T12", domain: "lab",       set: "B", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Pooja set the test tubes in the rack.", s2: "She added two drops of the red dye.",
      s3_congruent: "The samples glowed a deep steady red.",
      s3_oddball:   "Glass beakers crowded the near shelf." },         /* revised */

    { id: "T13", domain: "kitchen",   set: "B", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Aman dropped the oranges into the juicer.", s2: "He pressed the lid down with both hands.",
      s3_congruent: "A tall glass of fresh juice was ready.",
      s3_oddball:   "Plates and cups filled the near sink." },         /* revised: old third was implausible (p2.71) */

    { id: "T14", domain: "office",    set: "B", probe_pair: "S2-S3", oddball_type: "tool-use",
      s1: "Leela opened the parcel at her desk.", s2: "She checked the items against the list.",
      s3_congruent: "She signed the slip and accepted the delivery.",
      s3_oddball:   "She reached for the scissors in the drawer." },   /* KEPT: validated (p4.29 t2.43) but TOOL-USE type.
                                                                          Setting/state swap if homogeneity preferred:
                                                                          "A calendar hung on the far wall." */

    { id: "T15", domain: "garden",    set: "B", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Mohit filled the clay pot with dark soil.", s2: "He settled the small fern into the centre.",
      s3_congruent: "The fern stood green in its new pot.",
      s3_oddball:   "The balcony was bright with afternoon sun." },    /* KEPT: validated (p4.00 t2.43) */

    { id: "T16", domain: "studio",    set: "B", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Ria placed the print on the cutting board.", s2: "She trimmed the edges with a sharp blade.",
      s3_congruent: "The photo sat neatly inside its frame.",
      s3_oddball:   "Old frames leaned against the wall." },           /* revised */

    /* ===== SET C (T17-T24): 6x S2-S3, 2x S1-S2  — UNNORMED SEEDS ===== */
    { id: "T17", domain: "kitchen",   set: "C", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Nisha poured the lentils into the pot.", s2: "She stirred the dal with a ladle.",
      s3_congruent: "The thick dal was ready to serve.",
      s3_oddball:   "A row of jars lined the shelf." },                /* adjusted: was steam (theme tie) */

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
      s3_oddball:   "A pegboard of tools hung on the wall." },         /* adjusted: was sawdust smell (theme tie) */

    { id: "T21", domain: "garden",    set: "C", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Bina raked the leaves into a pile.", s2: "She scooped them into a large bag.",
      s3_congruent: "The lawn lay clear and tidy again.",
      s3_oddball:   "A stone bench sat near the wall." },              /* adjusted for consistency */

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

    /* ===== SET D (T25-T32): 6x S2-S3, 2x S1-S2  — UNNORMED SEEDS ===== */
    { id: "T25", domain: "market",    set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Hina spread the spices across the counter.", s2: "She ground the mix in a stone bowl.",
      s3_congruent: "The fresh masala filled a small jar.",
      s3_oddball:   "Sacks of grain stood by the wall." },            /* adjusted for consistency */

    { id: "T26", domain: "classroom", set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Yash arranged the slides on the projector.", s2: "He focused the image on the screen.",
      s3_congruent: "The diagram appeared crisp for the class.",
      s3_oddball:   "The classroom was lined with old maps." },

    { id: "T27", domain: "bathroom",  set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Rhea filled the basin with cold water.", s2: "She soaked the cloth and wrung it out.",
      s3_congruent: "The mirror wiped clear and bright.",
      s3_oddball:   "A row of bottles lined the shelf." },            /* adjusted for consistency */

    { id: "T28", domain: "bedroom",   set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Sahil stripped the sheets from the mattress.", s2: "He spread a fresh cover over the bed.",
      s3_congruent: "The bed looked crisp and freshly made.",
      s3_oddball:   "A framed photo stood on the shelf." },           /* adjusted for consistency */

    { id: "T29", domain: "kitchen",   set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Tara rinsed the rice in the bowl.", s2: "She set it to cook in the pan.",
      s3_congruent: "The fluffy rice was ready for dinner.",
      s3_oddball:   "A clock ticked above the far door." },           /* adjusted for consistency */

    { id: "T30", domain: "office",    set: "D", probe_pair: "S2-S3", oddball_type: "setting_state",
      s1: "Neil gathered the slides for the meeting.", s2: "He loaded the deck onto the laptop.",
      s3_congruent: "The presentation ran without a single glitch.",
      s3_oddball:   "Chairs were ranged around the long table." },    /* adjusted for consistency */

    { id: "T31", domain: "garage",    set: "D", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Asif lifted the toolbox onto the bench.", s2: "He laid the spanners out in a row.",
      s3_congruent: "The tools were ready for the repair.",
      s3_oddball:   "The garage door stood half open." },

    { id: "T32", domain: "garden",    set: "D", probe_pair: "S1-S2", oddball_type: "setting_state",
      s1: "Lina filled the can at the outdoor tap.", s2: "She walked it over to the flower bed.",
      s3_congruent: "The thirsty plants drank the cool water.",
      s3_oddball:   "A stone path wound past the beds." }             /* adjusted for consistency */
  ],

  /* ---------------------------------------------------------------
     ATTENTION-CHECK FRAMES — 2 dedicated frames (excluded from tests)
     --------------------------------------------------------------- */
  attention_checks: [
    { id: "AC1", domain: "kitchen", s1: "Gita placed the kettle on the stove.",   s2: "She waited for the water to boil." },
    { id: "AC2", domain: "office",  s1: "Mark opened his notebook on the desk.",  s2: "He clicked his pen and looked up." }
  ],
  attention_check_sentence: "For this story, please choose \"Guess\" as your confidence."
};
