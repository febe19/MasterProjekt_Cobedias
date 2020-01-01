# MasterProjekt COBEDIAS

### Idea and goal
This is the prototype for the Master Project at the Department of Informatics at UZH of Anna, Ivo, Joachim and Fabio. The goal of it is to improve the current COBEDIAS version with new ideas. You can find more infos about COBEDIAS under http://cobedix.ch/. In a nutshell, COBEDIAS is a medical software which records patients data and helps recognizing diseases by comparing patient data to other anonymized data. 

Our underlying idea heads towards the outsourcing of some parts of the consultation to the patient and to improve the investigation's quality. Our solution is a frontend based on React JS. For the part of the family anamnesis the family tree of https://github.com/SanichKotikov/react-family-tree was used and completely revised for the project's purpose.  

### How to run it
First, one has to install npm, the node package manager. If you use MAC OS, you can follow the instructions under https://treehouse.github.io/installation-guides/mac/node-mac.html to set up npm as well as homebrew if not done already. Windows users can follow the instructions under https://www.npmjs.com/get-npm to set up npm. 

If there are problems when setting up the device, find further information for React on MAC under https://www.robinwieruch.de/react-js-macos-setup and for Windows under https://www.robinwieruch.de/react-js-windows-setup.

After having installed npm, clone the repository to your desktop to open it in your IDE. Navigate to the folder `masterprojekt_cobedias` by typing `cd masterprojekt_cobedias` and run `npm install`. Then, start the frontend with `npm start` in the same folder. Accordingly, the prototype will be started on the `localhost:3000` in your chosen browser. If you want to go through the prototype several times creating new entries, make sure to delete all data in the local storage. When using Chrome, this can be done in the tab *Application* in the developers console.
