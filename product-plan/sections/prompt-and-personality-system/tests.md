# Test Specs: Prompt & Personality System

## User Flow Tests

### Flow 1: Edit Personality

**Scenario:** User wants to make an AI persona more "aggressive".

#### Success Path

**Steps:**
1. User clicks "Edit" on a personality card
2. User changes "Temperature" slider to 0.9
3. User appends "Be more aggressive in your criticism." to the System Prompt
4. User clicks "Save Changes"

**Expected Results:**
- [ ] `onSave` is called with the updated Personality object
- [ ] UI shows a success notification
- [ ] App returns to the personality grid

## Edge Cases
- [ ] Attempting to save with an empty System Prompt should be blocked
- [ ] Long system prompts should be scrollable in the editor
