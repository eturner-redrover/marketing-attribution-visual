# Touchpoint Trigger Reference
## All Available Triggers for HubSpot Custom Attribution

---

## Phase 1: MVP (Form Submissions)

### 1. Form Submissions ✅ MVP
**Trigger:** Contact submits any HubSpot form
**Workflow Enrollment:** "Contact has filled out [form]" 

| Data Available | Source |
|----------------|--------|
| utm_source | Hidden field (auto-populated) |
| utm_medium | Hidden field (auto-populated) |
| utm_campaign | Hidden field (auto-populated) |
| utm_content | Hidden field (auto-populated) |
| utm_term | Hidden field (auto-populated) |
| Page URL | Form submission data |
| Form name | Form submission data |
| Timestamp | Automatic |

**Setup Required:**
- Add hidden UTM fields to all forms
- Create touchpoint workflow per form (or one workflow with branching)

**Reliability:** ⭐⭐⭐⭐⭐ (Most reliable - explicit conversion)

---

## Phase 2: High-Value Additions

### 2. Marketing Email Clicks ✅ Recommended
**Trigger:** Contact clicks link in marketing email
**Workflow Enrollment:** "Contact has clicked link in email [any/specific]"

| Data Available | Source |
|----------------|--------|
| utm_source | Hardcode "hubspot" |
| utm_medium | Hardcode "email" |
| utm_campaign | Email name or campaign property |
| utm_content | Link URL or alias |
| Email name | HubSpot email data |
| Timestamp | Automatic |

**Setup Required:**
- Workflow: When contact clicks link in marketing email → Create Touchpoint
- Use email campaign name as utm_campaign
- Optional: Add UTMs to email links for more granularity

**Reliability:** ⭐⭐⭐⭐⭐ (Very reliable - HubSpot tracks automatically)

---

### 3. Meeting Booked
**Trigger:** Contact books meeting via HubSpot meetings tool
**Workflow Enrollment:** "Contact has booked a meeting"

| Data Available | Source |
|----------------|--------|
| utm_source | From meeting link UTMs (if added) OR hardcode "direct" |
| utm_medium | Hardcode "meeting" |
| utm_campaign | Meeting name/type |
| Meeting type | HubSpot meeting data |
| Owner | HubSpot meeting data |
| Timestamp | Automatic |

**Setup Required:**
- Workflow: When meeting booked → Create Touchpoint
- **Important:** Add UTMs to meeting links you share externally
  - Example: `meetings.hubspot.com/yourname?utm_source=linkedin&utm_medium=paid_social&utm_campaign=q1_launch`
- For meetings booked from your website, UTMs carry over if on same session

**Reliability:** ⭐⭐⭐⭐ (Reliable trigger, but UTM capture depends on link setup)

---

### 4. Sales Email Replies
**Trigger:** Contact replies to a tracked sales email (sequences or 1:1)
**Workflow Enrollment:** "Contact has replied to email" (requires Sales Hub)

| Data Available | Source |
|----------------|--------|
| utm_source | Hardcode "sales" or rep name |
| utm_medium | Hardcode "email" |
| utm_campaign | Sequence name (if applicable) |
| Sequence name | HubSpot sequence data |
| Owner | Email sender |
| Timestamp | Automatic |

**Setup Required:**
- Workflow: When contact replies to sales email → Create Touchpoint
- Tag with sequence name if from sequence

**Reliability:** ⭐⭐⭐⭐ (Reliable - shows genuine sales engagement)

---

### 5. Chat Conversations
**Trigger:** Contact starts or completes chat conversation
**Workflow Enrollment:** "Contact has started/completed a conversation"

| Data Available | Source |
|----------------|--------|
| utm_source | Page UTMs (if captured) OR hardcode "website" |
| utm_medium | Hardcode "chat" |
| utm_campaign | Chatflow name |
| Page URL | Where chat started |
| Chatflow | HubSpot conversation data |
| Timestamp | Automatic |

**Setup Required:**
- Workflow: When conversation completed → Create Touchpoint
- **Challenge:** UTMs from the page visit may not persist to chat
- Workaround: Capture page URL and infer source from referrer if possible

**Reliability:** ⭐⭐⭐ (Trigger reliable, UTM capture less reliable)

---

### 6. Document Viewed (Sales Documents)
**Trigger:** Contact views a tracked document (proposals, decks via HubSpot docs)
**Workflow Enrollment:** Not directly available - requires workaround

| Data Available | Source |
|----------------|--------|
| utm_source | Hardcode "sales" |
| utm_medium | Hardcode "document" |
| utm_campaign | Document name |
| Document name | Manual or via API |
| Timestamp | Manual or via API |

**Setup Required:**
- **Workaround needed:** HubSpot doesn't have native workflow trigger
- Option A: Use Zapier/Make to catch document view → create touchpoint via API
- Option B: Manual logging by sales team
- Option C: Custom code using HubSpot document tracking API

**Reliability:** ⭐⭐ (Valuable signal, but harder to automate)

---

## Phase 3: Extended Tracking

### 7. Ad Clicks (HubSpot Ads)
**Trigger:** Contact clicks ad tracked via HubSpot Ads tool
**Workflow Enrollment:** "Contact has interacted with ad [campaign]"

| Data Available | Source |
|----------------|--------|
| utm_source | Ad network (google, facebook, linkedin) |
| utm_medium | Ad type (cpc, paid_social) |
| utm_campaign | Ad campaign name |
| Ad network | HubSpot ads data |
| Ad campaign | HubSpot ads data |
| Timestamp | Automatic |

**Setup Required:**
- Connect ad accounts to HubSpot
- Workflow: When contact interacts with ad → Create Touchpoint
- **Note:** Only works for ads managed/tracked in HubSpot

**Reliability:** ⭐⭐⭐⭐ (If using HubSpot Ads tool; otherwise use UTMs on landing pages)

---

### 8. High-Value Page Views (Known Contacts Only)
**Trigger:** Known contact views specific high-intent pages (pricing, demo, case studies)
**Workflow Enrollment:** "Contact has viewed page [URL contains]"

| Data Available | Source |
|----------------|--------|
| utm_source | Contact's latest traffic source |
| utm_medium | Contact's latest traffic medium |
| utm_campaign | Last campaign they came from |
| Page URL | Page view data |
| Timestamp | Automatic |

**Setup Required:**
- Workflow: When contact views page containing "/pricing" → Create Touchpoint
- **Be selective** - only track genuinely high-intent pages:
  - /pricing
  - /demo
  - /contact
  - /case-studies
  - /compare or /vs-competitor

**Reliability:** ⭐⭐⭐ (Trigger works, but UTM data is "latest" not "this visit")

**⚠️ Warning:** HubSpot's contact UTM fields show the MOST RECENT values, not the UTMs from THIS specific page view. For accurate page-view attribution, you'd need:
- Custom tracking code to capture UTMs per page view
- Or accept that page view touchpoints use "last known" UTMs

---

### 9. Call Logged
**Trigger:** Call logged on contact record
**Workflow Enrollment:** "Call outcome is [any]" or "Activity type = Call"

| Data Available | Source |
|----------------|--------|
| utm_source | Hardcode "sales" |
| utm_medium | Hardcode "call" |
| utm_campaign | None (or call campaign if exists) |
| Call outcome | HubSpot activity data |
| Call duration | HubSpot activity data |
| Owner | Call logger |
| Timestamp | Call time |

**Setup Required:**
- Workflow: When call logged with outcome → Create Touchpoint
- Only count completed/connected calls (not "no answer")

**Reliability:** ⭐⭐⭐⭐ (Reliable if reps log calls consistently)

---

### 10. LinkedIn Message Reply (if using Sales Navigator sync)
**Trigger:** Contact replies to LinkedIn InMail (requires Sales Navigator + HubSpot sync)
**Workflow Enrollment:** Limited - may need Zapier/Make

| Data Available | Source |
|----------------|--------|
| utm_source | Hardcode "linkedin" |
| utm_medium | Hardcode "inmail" |
| utm_campaign | Outreach campaign name |
| Timestamp | Sync time |

**Setup Required:**
- Sales Navigator integration active
- Zapier/Make to catch InMail replies → Create Touchpoint via API

**Reliability:** ⭐⭐ (Depends on integration quality)

---

### 11. Webinar Attendance
**Trigger:** Contact attends webinar (Zoom, GoToWebinar, etc. with HubSpot integration)
**Workflow Enrollment:** "Contact has [webinar field] = attended" (depends on integration)

| Data Available | Source |
|----------------|--------|
| utm_source | Hardcode "webinar" |
| utm_medium | Hardcode "event" |
| utm_campaign | Webinar name |
| Attendance status | Webinar integration |
| Duration | Some integrations |
| Timestamp | Event time |

**Setup Required:**
- Webinar platform integrated with HubSpot
- Workflow: When webinar attendance field updated to "attended" → Create Touchpoint
- Could differentiate: registered vs. attended vs. watched replay

**Reliability:** ⭐⭐⭐⭐ (If using integrated webinar platform)

---

### 12. Video Watched (if using Vidyard, Wistia, etc.)
**Trigger:** Contact watches embedded video past threshold (25%, 50%, etc.)
**Workflow Enrollment:** Depends on integration - usually custom property updated

| Data Available | Source |
|----------------|--------|
| utm_source | Page UTMs or hardcode |
| utm_medium | Hardcode "video" |
| utm_campaign | Video name |
| Video name | Integration data |
| % watched | Integration data |
| Timestamp | Automatic |

**Setup Required:**
- Video platform integrated with HubSpot
- Workflow: When video watch % > threshold → Create Touchpoint
- Set meaningful threshold (50%+) to avoid noise

**Reliability:** ⭐⭐⭐ (Depends on video platform integration)

---

## Summary: Recommended Implementation Order

| Phase | Trigger | Effort | Value | Priority |
|-------|---------|--------|-------|----------|
| **MVP** | Form Submissions | Low | ⭐⭐⭐⭐⭐ | Do first |
| **2** | Marketing Email Clicks | Low | ⭐⭐⭐⭐⭐ | Do second |
| **2** | Meeting Booked | Low | ⭐⭐⭐⭐ | Do second |
| **2** | Sales Email Replies | Low | ⭐⭐⭐⭐ | Do second |
| **3** | Chat Conversations | Medium | ⭐⭐⭐ | When ready |
| **3** | Webinar Attendance | Medium | ⭐⭐⭐⭐ | When ready |
| **3** | Call Logged | Low | ⭐⭐⭐ | When ready |
| **3** | High-Value Page Views | Medium | ⭐⭐⭐ | When ready |
| **4** | Document Viewed | High | ⭐⭐⭐ | Nice to have |
| **4** | Video Watched | High | ⭐⭐⭐ | Nice to have |
| **4** | LinkedIn InMail | High | ⭐⭐ | Nice to have |

---

## Architecture Note: One Workflow vs. Many

**Option A: One workflow per trigger type**
- Easier to manage and debug
- Clear ownership
- Recommended for MVP

**Option B: Single "Touchpoint Factory" workflow with branching**
- Cleaner once mature
- Harder to debug
- Consider after MVP is stable

---

## UTM Handling by Trigger Type

| Trigger | UTM Source | Notes |
|---------|------------|-------|
| Form submission | Hidden fields | Most reliable |
| Email click | Hardcode or email UTMs | Add UTMs to links for granularity |
| Meeting booked | Meeting link UTMs | Must add UTMs to shared meeting links |
| Ad click | HubSpot Ads data | Only if using HubSpot Ads |
| Page view | Contact's "latest" UTMs | ⚠️ Not page-specific |
| Chat | Page UTMs (maybe) | Often lost |
| Call / Sales email | Hardcode "sales" | No marketing UTMs |
| Webinar | Registration UTMs | Carried from signup |

---

## Next Steps

1. **MVP:** Build form submission touchpoint workflow
2. **Phase 2:** Add email clicks + meetings (low effort, high value)
3. **Phase 3:** Add remaining triggers as bandwidth allows
4. **Ongoing:** Review touchpoint data monthly, tune what you're capturing
