# Zoo Notes

Zoo Notes is a web app that lets users view extracts and reductions for [Zooniverse](https://www.zooniverse.org/) Subjects. This app is intended to be used in classrooms, where teachers can show students how their individual classification efforts can come together to create aggregated results. It's the power of the crowd, made visible!

Website: https://zoo-notes.zooniverse.org/

## Usage

**Required Setup:**

- Zoo Notes only works for Workflows that have been set up for aggregations in [Caesar.](https://github.com/zooniverse/caesar)
- Currently support Subject types:
  - Single image subjects.
- Currently supported aggregations:
  - Points (drawing marks) 
  - Single-Answer Questions

**The Classroom Story:**

1. Teachers start at the [home page](https://zoo-notes.zooniverse.org/) and type in a **Workflow ID** for the workflow they want to observe.
2. This will open the **Workflow Observation page,** e.g. https://zoo-notes.zooniverse.org/view/workflow/1234
3. In a _separate browser tab/window_ (or on _separate computers_ ), the teacher (or students on their own computers) opens the Zooniverse Classifier page for that workflow, e.g. https://zooniverse.org/projects/foo/bar/classify/workflow/1234
4. As the teacher/students make Classifications on Subjects on the Classifier page, the Workflow Observation page will keep track of them.
5. The teacher can **click on the Subjects** that now appear on the Workflow Observation page.
6. This will open the **Subject Viewer page,** where teachers can show students how different classifications from different users on the same subject can lead to a consensus result.

**Recommendations:**

- If you're setting up a Workflow for a classroom, you'll want to find a good balance for the number of Subjects you present to your students.
- If you have too _many_ Subjects, then you won't get enough Classifications per Subject to create a consensus.
- If you have too _few_ Subjects, then you're going to have _too much consensus._ (This isn't too bad, it just looks slightly goofy when you have 100 classification
- Be sure to check the individual Caesar aggregation settings. e.g., for Point aggregations, you might tweak the settings to say something like "at least 5 individual points in a 10 pixel radius is required to create a consensus point" to suit one project, or "at least 3 points in a 5 pixel radius" to suit another.

### Features

**Workflow Observation page**

- e.g. https://zoo-notes.zooniverse.org/view/workflow/1234
- Observes Classifications made for a workflow, in real-time.
  - ⚠️ This page must be open when Classifications are made.
- Records the Subject IDs as they are classified, and can store up to 50 Subject IDs in local storage.
- You can clear the Subjects that have been observed for this session, to refresh the presentation for the next classroom. _However, this will not erase the Classifications/aggregations data for each Subject. You're just clearing the list of "recently seen Subjects"!_

**Subject Viewer page**

- e.g. https://zoo-notes.zooniverse.org/view/workflow/1234/subject/5678
- Shows a (single image) Subject.
- You can pan and zoom to get a better view of the Subject image.
- You can switch between different Workflow Tasks for that Subject.

**...with Point aggregations**

- Shows "raw points" (the points made by individual users) and "averaged points" (the consensus results) on the Subject image.
- Points can be toggled on/off.
- A summary of results is shown on the right-hand panel, to help teachers explain to students what they're seeing.

**...with Single-Answer Question aggregations**

- Shows the number of people who chose different answers for each question. It's a poll result page, basically.
- The aggregations viewer comes in two flavours: bar chart and pie chart.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- `yarn start` starts the web app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `yarn eject` is a ONE-WAY operation that disassembles the React Script into its component bits. Maybe DON'T run this code, unless `react-script` is completely borked.

### External Dependencies

This web app requires a few things outside of the code to work.

- Users need to make Classifications on the appropriate project/workflow on **Zooniverse.org.**
- The project/workflow must be properly set up on **Caesar.**
- The **Panoptes API** must be alive so we can fetch Subject and Workflow resources.
- The **Caesar API** must be alive so we can fetch Aggregations (consensus results).
- The Zooniverse Pushr stream must be alive for the Workflow Observation page to observe new classifications.

## Deployment

Deployment is handled by Github Action. Both staging and production deployment can be run ad hoc in the actions tab as needed if you have the appropriate permissions on the repository.

###  Staging

This app does not have a staging deployment.

### Production

Production deployments are triggered by an update to which commit the `production-release` tag is pointed to. This tag should be updated via chat ops and then a Github Action will run that builds and uploads the files to our cloud provider found at `https://zoo-notes.zooniverse.org/`.
