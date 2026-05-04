# Test Specs: Commentary History

## User Flow Tests

### Flow 1: View Session Detail

**Steps:**
1. User clicks a session card in the history grid
2. User views the transcript entries

**Expected Results:**
- [ ] `onSelectSession` is called with the session ID
- [ ] Detail view renders all commentary entries from the session
- [ ] Timestamps are formatted correctly (e.g. "00:12:45")

## Empty State
- [ ] If `sessions` is empty, show "No commentary history yet"
