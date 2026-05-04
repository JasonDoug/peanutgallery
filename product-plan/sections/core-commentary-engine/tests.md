# Test Specs: Core Commentary Engine

These test specs are **framework-agnostic**.

## User Flow Tests

### Flow 1: Setup a Commentary Session

**Scenario:** User prepares a movie for viewing with AI commentary.

#### Success Path

**Setup:**
- App is on the Setup page
- Mock agents and voices are available

**Steps:**
1. User enters "https://example.com/movie.mp4" in the video URL field
2. User clicks on "The Snarky Critic" card in the agent selector
3. User selects "UK Male" from the voice dropdown
4. User clicks "Start Commentary"

**Expected Results:**
- [ ] `onVideoUrlSubmit` is called with the correct URL
- [ ] `onAgentSelect` is called with the ID of "The Snarky Critic"
- [ ] `onStartCommentary` is called
- [ ] UI transitions to the active session state

## Component Interaction Tests

### AgentSelector
- [ ] Displays all agents passed in data
- [ ] Highlights the currently selected agent
- [ ] Calls `onAgentSelect` when an unselected agent is clicked
