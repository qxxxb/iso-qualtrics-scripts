# Ohio University International Student Orientation (2018) registration survey scripts
JavaScript scripts embedded in some questions of the registration survey. Usage examples include splitting a time range into a bunch of different slots or distributing participants equally among distinct groups for events.

## Usage
### New script for a question
- Create the script in `src/per-question/`
- Add an entrypoint for it `webpack.config.js`
- Run `npm run build` or `npm run dev` and webpack will output the script to the `dist/` directory
- Copy the JavaScript in the output file to the embedded JavaScript field for your question in Qualtrics
