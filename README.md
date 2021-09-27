1. Wrote down all the basic function unit tests
    - Found that the data access layer did not decouple with the code
2. Decoupled the data access layer to models folder
    - Actions
        - Used Class structure to apply the data access logic
        - Met the requirement that fit the basic example which set the MaxClaimableSeason = 1
        - Wrote the unit tests for all data models
    - Found that it is necessary to store the stakeholders' claim history 
3. Added functions associated with claim, and rewrite the calculateClaimableAmount logic
    - Actions
        - Design: When it goes to the end of season, it will update all information including claimable amount which depends on the stakeholder situation.
        - Added Integration tests to make sure the system works.