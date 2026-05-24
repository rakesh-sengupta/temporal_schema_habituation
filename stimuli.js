/* =====================================================================
   stimuli.js  —  Temporal Schema Habituation experiment
   ---------------------------------------------------------------------
   THIS IS THE FILE YOU EDIT during Weeks 2-3 of stimulus construction.
   You should NOT need to touch experiment.js to change the materials.

   Schema:  Activity-Start  ->  Tool-Use  ->  Result

   RULES (from the proposal, §4.7):
     - Each sentence is roughly 5-9 words, simple subject-verb-object.
     - No more than 3 stories per surface domain across the 24 habituation
       trials. (This bank uses 12 domains x 2 = 24, which is well within it.)
     - Test frames come in TWO versions that SHARE sentences 1 and 2 and
       differ ONLY in sentence 3:
           s3_congruent  = a proper Result (completes the schema)
           s3_oddball    = locally plausible but NOT a Result
                           (another Tool-Use, a Setting restatement, a closure)
     - Oddball thirds must pass norming: plausibility >= 4/7, typicality <= 3/7.

   The counterbalancing engine in experiment.js decides, per participant,
   which test frames are shown in their congruent vs oddball version, so you
   write BOTH versions for every test frame and let the engine rotate them.
   ===================================================================== */

window.STIMULI = {

  /* ---------------------------------------------------------------
     HABITUATION SET — 24 schema-congruent stories
     12 domains x 2 stories each.
     --------------------------------------------------------------- */
  habituation: [
    { id: "H01", domain: "kitchen",   s1: "Raj saw the boiling water on the stove.",      s2: "He added the tea leaves to the pot.",          s3: "He poured himself a perfect cup of tea." },
    { id: "H02", domain: "kitchen",   s1: "Priya sat down at the kitchen table.",         s2: "She chopped the onions with a sharp knife.",    s3: "The vegetables were soon ready for the curry." },
    { id: "H03", domain: "office",    s1: "Vikram opened the laptop on his desk.",         s2: "He typed the report into the open document.",   s3: "He emailed the finished file to his manager." },
    { id: "H04", domain: "office",    s1: "Rohit cleared the clutter from his desk.",      s2: "He sorted the papers into labelled folders.",   s3: "His workspace looked clean and well organised." },
    { id: "H05", domain: "garage",    s1: "Arun walked into the dimly lit garage.",        s2: "He loosened the bolt with his wrench.",         s3: "The bicycle wheel finally came off cleanly." },
    { id: "H06", domain: "garage",    s1: "Manoj opened the bonnet of the car.",           s2: "He tightened the loose cap by hand.",           s3: "The engine started smoothly on the first try." },
    { id: "H07", domain: "studio",    s1: "Mira stood in the bright art studio.",          s2: "She dipped her brush into the blue paint.",     s3: "The canvas slowly filled with vivid colour." },
    { id: "H08", domain: "studio",    s1: "Karan set the camera on its tripod.",           s2: "He aimed the lens toward the busy street.",     s3: "He captured a sharp picture of the crowd." },
    { id: "H09", domain: "market",    s1: "Ravi entered the small corner grocery store.",  s2: "He filled a basket with fresh vegetables.",     s3: "He walked home with a heavy shopping bag." },
    { id: "H10", domain: "market",    s1: "Salim stopped at the busy fish stall.",         s2: "He weighed the morning catch on the scale.",    s3: "He packed the fish into crushed ice." },
    { id: "H11", domain: "classroom", s1: "Sneha opened her textbook on the desk.",        s2: "She underlined the key formulas with her pen.", s3: "She felt prepared for the morning exam." },
    { id: "H12", domain: "classroom", s1: "Lata gathered her notes at the table.",         s2: "She wrote the essay in her notebook.",          s3: "She handed the finished pages to her teacher." },
    { id: "H13", domain: "garden",    s1: "Hari knelt beside the dry flower bed.",         s2: "He watered the seedlings with a small can.",    s3: "The little plants stood fresh and green." },
    { id: "H14", domain: "garden",    s1: "Geeta stepped into the morning vegetable garden.", s2: "She picked the ripe tomatoes into a bowl.",  s3: "She carried the full bowl indoors." },
    { id: "H15", domain: "bathroom",  s1: "Divya stood before the bathroom mirror.",       s2: "She combed her hair with a wide comb.",         s3: "She looked tidy and ready for work." },
    { id: "H16", domain: "bathroom",  s1: "Sara filled the bucket with soapy water.",      s2: "She scrubbed the floor with a stiff brush.",    s3: "The tiles gleamed clean under the light." },
    { id: "H17", domain: "workshop",  s1: "Sameer measured the plank on the workbench.",   s2: "He cut the wood with a steady saw.",            s3: "The new shelf fit neatly on the wall." },
    { id: "H18", domain: "workshop",  s1: "Tarun held the loose board in place.",          s2: "He hammered the nails along its edge.",         s3: "The board sat firm against the frame." },
    { id: "H19", domain: "bedroom",   s1: "Aanya stood before the open wardrobe.",         s2: "She took out a freshly pressed shirt.",         s3: "She left the house looking neat." },
    { id: "H20", domain: "bedroom",   s1: "Vivek noticed the creased shirt on the bed.",   s2: "He pressed it flat with the warm iron.",        s3: "The shirt hung crisp and ready to wear." },
    { id: "H21", domain: "library",   s1: "Asha searched along the tall library shelves.", s2: "She pulled a thick volume from the row.",       s3: "She found the chapter she had sought." },
    { id: "H22", domain: "library",   s1: "Nikhil stacked the borrowed books on the counter.", s2: "He scanned each barcode with the reader.",  s3: "The librarian cleared his account at once." },
    { id: "H23", domain: "lab",       s1: "Doctor Roy entered the cool chemistry lab.",    s2: "He measured the solution into a flask.",        s3: "The mixture turned a bright clean blue." },
    { id: "H24", domain: "lab",       s1: "Megha sat down at the microscope bench.",       s2: "She placed the thin slide under the lens.",     s3: "The cells appeared sharp in her view." }
  ],

  /* ---------------------------------------------------------------
     TEST FRAMES — 16 frames, each with BOTH a congruent and an
     oddball third sentence. Surface-novel relative to habituation.
     The engine shows 8 congruent + 8 oddball per participant.
     --------------------------------------------------------------- */
  test: [
    { id: "T01", domain: "kitchen",   s1: "Meena cracked the eggs into the mixing bowl.",  s2: "She whisked the batter with a fork.",
      s3_congruent: "She slid the cake tray into the oven.",
      s3_oddball:   "She wiped the counter with a damp cloth.",        oddball_type: "tool-use" },

    { id: "T02", domain: "office",    s1: "Sanjay opened the file on the office computer.", s2: "He clicked print and waited by the tray.",
      s3_congruent: "He stapled the warm pages into a report.",
      s3_oddball:   "The office was quiet in the early morning.",      oddball_type: "setting" },

    { id: "T03", domain: "garage",    s1: "Ramesh spread newspaper across the garage floor.", s2: "He shook the can and pressed the nozzle.",
      s3_congruent: "The old stool gleamed with a fresh coat.",
      s3_oddball:   "The garage smelled of paint and petrol.",        oddball_type: "setting" },

    { id: "T04", domain: "studio",    s1: "Anu sat down at the pottery wheel.",            s2: "She pressed her thumbs into the spinning clay.",
      s3_congruent: "A smooth bowl rose under her hands.",
      s3_oddball:   "She tied her apron tighter around her waist.",   oddball_type: "activity-start" },

    { id: "T05", domain: "market",    s1: "Zoya laid the cloth on the tailor's table.",    s2: "She cut the fabric along the chalk line.",
      s3_congruent: "The blouse pieces were ready to be stitched.",
      s3_oddball:   "The shop was lined with colourful spools.",      oddball_type: "setting" },

    { id: "T06", domain: "classroom", s1: "Aditya stood at the science classroom bench.",  s2: "He poured the liquid into the glass beaker.",
      s3_congruent: "The solution fizzed and turned bright green.",
      s3_oddball:   "He glanced at the clock on the wall.",           oddball_type: "tool-use" },

    { id: "T07", domain: "garden",    s1: "Suresh wheeled the mower onto the lawn.",       s2: "He pushed it slowly across the long grass.",
      s3_congruent: "The lawn lay flat and freshly trimmed.",
      s3_oddball:   "The garden was wide and full of birds.",         oddball_type: "setting" },

    { id: "T08", domain: "bathroom",  s1: "Naveen leaned toward the foggy mirror.",        s2: "He drew the razor along his jaw.",
      s3_congruent: "His face was smooth and clean again.",
      s3_oddball:   "He turned the warm tap on once more.",           oddball_type: "tool-use" },

    { id: "T09", domain: "workshop",  s1: "Iqbal placed the circuit board on the mat.",    s2: "He touched the hot iron to the joint.",
      s3_congruent: "The wire held firm in a shiny bead.",
      s3_oddball:   "The workbench was crowded with small tools.",    oddball_type: "setting" },

    { id: "T10", domain: "bedroom",   s1: "Reena opened the empty suitcase on the bed.",   s2: "She folded the clothes into neat piles.",
      s3_congruent: "The packed bag zipped shut with ease.",
      s3_oddball:   "She glanced at the clock beside the lamp.",      oddball_type: "tool-use" },

    { id: "T11", domain: "library",   s1: "Tanvi gathered the loose sheets on the table.", s2: "She punched holes along the left margin.",
      s3_congruent: "The bound report looked tidy and complete.",
      s3_oddball:   "The reading room was silent and cool.",          oddball_type: "setting" },

    { id: "T12", domain: "lab",       s1: "Pooja set the test tubes in the rack.",         s2: "She added two drops of the red dye.",
      s3_congruent: "The samples glowed a deep steady red.",
      s3_oddball:   "She labelled each tube with a marker.",          oddball_type: "tool-use" },

    { id: "T13", domain: "kitchen",   s1: "Aman dropped the oranges into the juicer.",     s2: "He pressed the lid down with both hands.",
      s3_congruent: "A tall glass of fresh juice was ready.",
      s3_oddball:   "The kitchen window looked over the yard.",       oddball_type: "setting" },

    { id: "T14", domain: "office",    s1: "Leela opened the parcel at her desk.",          s2: "She checked the items against the list.",
      s3_congruent: "She signed the slip and accepted the delivery.",
      s3_oddball:   "She reached for the scissors in the drawer.",    oddball_type: "tool-use" },

    { id: "T15", domain: "garden",    s1: "Mohit filled the clay pot with dark soil.",     s2: "He settled the small fern into the centre.",
      s3_congruent: "The fern stood green in its new pot.",
      s3_oddball:   "The balcony was bright with afternoon sun.",     oddball_type: "setting" },

    { id: "T16", domain: "studio",    s1: "Ria placed the print on the cutting board.",    s2: "She trimmed the edges with a sharp blade.",
      s3_congruent: "The photo sat neatly inside its frame.",
      s3_oddball:   "She measured the print with a steel ruler.",     oddball_type: "tool-use" }
  ],

  /* ---------------------------------------------------------------
     ATTENTION-CHECK FRAMES (proposal §4.9).
     For these test frames, the third sentence is REPLACED at runtime
     by an explicit instruction, and the only thing scored is whether
     the participant follows it. These trials are flagged
     is_attention_check = 1 and are excluded from the main analyses.
     Use ids that exist in `test` above.
     --------------------------------------------------------------- */
  attention_check_ids: ["T04", "T12"],
  attention_check_sentence: "For this story, please choose \"Guess\" as your confidence."
};
