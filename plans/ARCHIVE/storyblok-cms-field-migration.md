# Storyblok CMS Field Migration Guide

## Executive Summary

### Why This Migration Is Needed

As part of Priority 1.2 standardization, we've updated the codebase to use consistent Dutch field naming (`tekst` instead of mixed `text`/`content`). The code has been updated, but the Storyblok CMS components still use the old field names. This guide walks you through renaming these fields in Storyblok to complete the migration.

### Components Affected

**2 out of 8 Bereikbaarheid components** require CMS field updates:
- [`BereikbaarHero`](../src/storyblok/visual/Bereikbaarheid/BereikbaarHero.astro) - `text` → `tekst`
- [`Parkeersectie`](../src/storyblok/visual/Bereikbaarheid/Parkeersectie.astro) - `content` → `tekst`

### Impact on Existing Content

> **✅ Good News:** Your existing content will be preserved! Storyblok handles field renaming internally—all content stored under the old field name will automatically be available under the new name.

### Time Estimate

⏱️ **5-10 minutes** for the complete migration

---

## Prerequisites

### Required Access

- ✅ Storyblok account access to the Aaltjesdagen space
- ✅ Admin or Developer role (required to edit component schemas)
- ✅ Familiarity with the Storyblok interface

> **⚠️ Important:** Only users with Admin or Developer permissions can modify component schemas. If you don't have access, contact your space administrator.

### Recommended Before Starting

- 📸 Take screenshots of current field configurations
- 💾 Note down current field settings (just in case)
- 🔄 Ensure no other team members are editing these components
- ⏰ Best time: During off-peak hours when no one is actively editing content

> **💡 Tip:** While Storyblok doesn't require a formal backup for field renaming, having screenshots can help if you need to verify settings later.

---

## Affected Components

### 1. BereikbaarHero Component

**Field Change:** `text` → `tekst`

**Field Type:** Textarea (rich text)

**Current Usage:** Hero section text content on the Bereikbaarheid page

**Why Changed:** Standardization to Dutch naming convention across all components

### 2. Parkeersectie Component

**Field Change:** `content` → `tekst`

**Field Type:** Textarea (rich text)

**Current Usage:** Parking section description text

**Why Changed:** Aligning with standardized `tekst` field name used in other components

---

## Step-by-Step Migration Guide

### Part 1: Updating BereikbaarHero Component

#### Step 1: Navigate to Components
1. Log into your Storyblok account
2. Select your **Aaltjesdagen** space
3. In the left sidebar, click on **"Components"**
4. Scroll or search for **"BereikbaarHero"**

#### Step 2: Open Component Editor
1. Click on the **BereikbaarHero** component name
2. You'll see the component schema editor
3. Locate the field currently named **`text`**

> **👁️ What to Look For:** The field should be of type "Textarea" or "Text" and likely contains placeholder text or description about hero content.

#### Step 3: Rename the Field
1. Click on the **gear/settings icon** next to the `text` field
2. In the field settings panel that opens, find the **"Technical Name"** field
3. Change the value from `text` to `tekst`
4. Leave all other settings unchanged (Display Name, Field Type, etc.)

> **⚠️ Warning:** Only change the **Technical Name**. Do NOT change the Field Type or delete and recreate the field, as this could cause data loss.

#### Step 4: Save Changes
1. Click **"Save"** in the field settings panel
2. Click **"Save"** again on the component editor screen
3. Wait for the success notification

> **✅ Success Indicator:** You should see a green notification saying "Component saved successfully" or similar.

#### Step 5: Verify the Change
1. Go to **"Content"** in the left sidebar
2. Open any story that uses the BereikbaarHero component
3. In the visual editor, verify that:
   - The field now appears as `tekst` in the schema
   - Your existing content is still visible
   - No errors appear in the console

---

### Part 2: Updating Parkeersectie Component

#### Step 1: Navigate to Components
1. In the left sidebar, click on **"Components"** (if not already there)
2. Scroll or search for **"Parkeersectie"**

#### Step 2: Open Component Editor
1. Click on the **Parkeersectie** component name
2. You'll see the component schema editor
3. Locate the field currently named **`content`**

> **👁️ What to Look For:** The field should be of type "Textarea" and is used for parking section descriptions.

#### Step 3: Rename the Field
1. Click on the **gear/settings icon** next to the `content` field
2. In the field settings panel, find the **"Technical Name"** field
3. Change the value from `content` to `tekst`
4. Leave all other settings unchanged

> **Important:** Consistency is key! We're standardizing all text content fields to use `tekst`.

#### Step 4: Save Changes
1. Click **"Save"** in the field settings panel
2. Click **"Save"** again on the component editor screen
3. Wait for the success notification

#### Step 5: Verify the Change
1. Go to **"Content"** in the left sidebar
2. Open any story that uses the Parkeersectie component
3. Verify that:
   - The field now appears as `tekst`
   - Your existing content is still there
   - The component renders correctly in preview

---

## Screenshot Placeholders

### Where to Click in Storyblok UI

```
Component Library
├── [Click] Components (left sidebar)
├── [Find] BereikbaarHero / Parkeersectie
└── [Click] Component name to edit
```

### Field Settings Panel

```
Field: text/content
├── Technical Name: [Change to "tekst"]
├── Display Name: [Leave unchanged]
├── Field Type: [Leave as is]
└── [Click] Save button
```

### Key UI Elements to Look For

1. **Components Menu** - Blocky icon in left sidebar
2. **Gear Icon** - Next to each field for settings
3. **Technical Name Input** - First field in the settings panel
4. **Save Button** - Bottom right of settings panel and component editor

> **💡 Visual Tip:** The Technical Name is usually in a monospace font to distinguish it from Display Name.

---

## Verification Steps

### How to Check If Migration Worked

#### ✅ Checklist for Each Component

- [ ] Field appears with new name `tekst` in component schema
- [ ] Existing content is still visible when editing stories
- [ ] No error messages in Storyblok editor
- [ ] Component preview renders correctly
- [ ] Preview server shows content properly (if running locally)

#### Step-by-Step Verification

1. **In Storyblok Components Section:**
   - Open the component
   - Confirm field name shows as `tekst`
   - Check that field type and settings are unchanged

2. **In Content Editor:**
   - Open a story using the component
   - Click on the component block
   - Verify `tekst` field contains your content
   - No red error indicators

3. **In Visual Preview:**
   - Load the page in Storyblok's visual editor
   - Check that text content displays correctly
   - No console errors (open browser DevTools)

#### Testing with Preview Server

If you have the local development server running (`npm run preview`):

1. Open the Bereikbaarheid page
2. Check that BereikbaarHero displays text content
3. Check that Parkeersectie displays parking info
4. Verify no console errors about missing `blok.tekst`

> **Expected Result:** Content should display exactly as it did before the migration. The field rename is transparent to end users.

---

## Rollback Plan

### If Something Goes Wrong

> **🆘 Don't Panic:** Field renaming is reversible. Here's what to do:

#### Scenario 1: Content Disappeared After Rename

**Solution:** The field name might not have saved correctly.

1. Go back to Components → [Component Name]
2. Revert the Technical Name back to original (`text` or `content`)
3. Save the component
4. Content should reappear immediately

#### Scenario 2: Component Won't Save

**Solution:** Check for validation errors.

1. Look for red error messages near fields
2. Ensure Technical Name doesn't contain spaces or special characters
3. Try a different browser if issues persist
4. Contact Storyblok support if error persists

#### Scenario 3: Preview Shows Errors

**Solution:** The code might be out of sync.

1. First, verify the field rename saved in Storyblok
2. Check that local code is using `blok.tekst` (should already be updated)
3. Restart development server: Stop and run `npm run preview` again
4. Clear browser cache and reload

### Emergency Contacts

- **Storyblok Support:** support@storyblok.com
- **Documentation:** https://www.storyblok.com/docs
- **Status Page:** https://status.storyblok.com

> **📝 Note:** Keep a record of what you changed so you can communicate clearly if you need support.

---

## FAQ Section

### Will existing content be affected?

**No.** Content is preserved during field renaming. Storyblok stores content by field ID (internal), not by field name. When you rename `text` to `tekst`, the content automatically appears under the new name.

### Do I need to republish pages after renaming?

**No.** Field renaming in Storyblok is transparent to the published content. However, you may want to republish a test page to verify everything works, but it's not required.

### What if I can't find the BereikbaarHero or Parkeersectie component?

**Troubleshooting:**
1. Check that you're in the correct Storyblok space (Aaltjesdagen)
2. Use the search bar in the Components section
3. Verify you have Admin/Developer permissions
4. If components are in a folder, expand all folders
5. Contact your space administrator if still not found

### Can I rename multiple fields at once?

**Yes and No.** You need to rename each field individually within the settings panel, but you can edit multiple fields in one component before saving the component. However, for clarity and safety, this guide recommends one field at a time.

### What happens if I delete the field instead of renaming it?

**Warning:** Deleting a field will remove all content stored in that field across all stories. Always rename, never delete. If you accidentally delete:
1. Don't save the component
2. Refresh the page to discard changes
3. If already saved, contact Storyblok support immediately

### Will this affect the API or integrations?

**Minimal impact.** The field ID remains the same, only the name changes. Your updated code (already using `blok.tekst`) will work correctly. Any external integrations using the old field name will need updating.

### How long do I have to complete this migration?

**Recommendation:** Complete within 1-2 weeks after the code is deployed. The code already expects `tekst`, so aligning the CMS sooner ensures consistency and prevents confusion for content editors.

### What if someone is currently editing content?

**Best Practice:** Notify editors before starting and ask them to save and close their work. Field renaming while someone is editing won't cause data loss, but they might see unexpected behavior and need to refresh.

---

## Technical Details

### Field Type Information

| Component | Old Name | New Name | Field Type | Rich Text |
|-----------|----------|----------|------------|-----------|
| BereikbaarHero | `text` | `tekst` | Textarea | Yes |
| Parkeersectie | `content` | `tekst` | Textarea | Yes |

### Content Migration

**How Storyblok Handles Field Renaming:**

- Content is stored by **field UUID** (internal identifier)
- Field name is just a "label" for that UUID
- When you rename, the UUID stays the same
- Content automatically appears under the new name
- No data migration scripts needed

### API Impact

#### Before Migration
```typescript
// In code (already updated):
blok.tekst

// In Storyblok CMS:
field: "text" or "content"
```

#### After Migration
```typescript
// In code (no change needed):
blok.tekst

// In Storyblok CMS (now aligned):
field: "tekst"
```

**Result:** Code and CMS are now fully aligned. No API changes required.

### Field ID Stability

> **Technical Note:** Storyblok uses internal field IDs (UUIDs) that remain stable across renames. When you query content via the API, the field ID is used internally, so renaming doesn't break existing integrations—only the field name in the schema changes.

---

## Post-Migration Validation

### Complete Validation Checklist

#### In Storyblok CMS

- [ ] Both components show `tekst` field in schema
- [ ] Component settings match previous configuration (except name)
- [ ] No warning or error indicators on components
- [ ] Content editor loads without errors
- [ ] Can edit and save content in renamed fields

#### In Content Entries

- [ ] Open a story with BereikbaarHero
  - [ ] `tekst` field displays existing content
  - [ ] Can edit and save changes
  - [ ] Preview shows content correctly
  
- [ ] Open a story with Parkeersectie
  - [ ] `tekst` field displays existing content
  - [ ] Can edit and save changes
  - [ ] Preview shows content correctly

#### In Development/Production

- [ ] Local preview server shows content correctly
- [ ] No console errors about missing fields
- [ ] Text renders with proper styling
- [ ] Visual editor in Storyblok shows no errors

#### Cross-Browser Testing

- [ ] Tested in Chrome/Edge
- [ ] Tested in Firefox (if used by editors)
- [ ] Visual editor loads properly
- [ ] Content saves successfully

### Final Sign-Off

Once you've completed all validation steps:

1. ✅ Document completion date: _________________
2. ✅ Tested by: _________________
3. ✅ All checklist items passed: Yes / No
4. ✅ Issues encountered: _________________
5. ✅ Notes for future reference: _________________

---

## When to Perform This Migration

### Recommended Timeline

- **Best Time:** After the code changes are merged and deployed
- **Status:** Code has been updated in Priority 1.2 (already done)
- **Action:** CMS migration should be completed next
- **Urgency:** Medium - complete within 1-2 weeks

### Before You Start

- [ ] Code changes are deployed to preview/staging
- [ ] Preview server is running (optional but helpful)
- [ ] No active content editing sessions
- [ ] Team is notified of the migration

### After Completion

- [ ] Update team that migration is complete
- [ ] Monitor for any issues in the next 24 hours
- [ ] Update project documentation
- [ ] Mark this task as complete in project tracker

---

## Additional Resources

### Storyblok Documentation

- [Managing Components](https://www.storyblok.com/docs/guide/essentials/content-structures#managing-components)
- [Field Types Reference](https://www.storyblok.com/docs/schema-configuration)
- [Component Schema](https://www.storyblok.com/docs/guide/in-depth/components)

### Project Documentation

- [BereikbaarHero Component](../src/storyblok/visual/Bereikbaarheid/BereikbaarHero.md)
- [Parkeersectie Component](../src/storyblok/visual/Bereikbaarheid/Parkeersectie.md)
- [Bereikbaarheid Refactor Plan](./bereikbaarheid-refactor-plan.md)
- [Bereikbaarheid Refactor Summary](./bereikbaarheid-refactor-summary.md)

### Support

If you encounter issues not covered in this guide:

1. Check the [Rollback Plan](#rollback-plan) section
2. Review the [FAQ](#faq-section)
3. Contact the development team
4. Open a support ticket with Storyblok

---

## Summary

This migration aligns the Storyblok CMS field names with the standardized code implementation. The process is straightforward, safe, and reversible. Following this guide ensures:

- ✅ Consistent naming across code and CMS
- ✅ No data loss or content disruption
- ✅ Improved developer and editor experience
- ✅ Proper system documentation

**Total time:** 5-10 minutes  
**Risk level:** Low (fully reversible)  
**Benefits:** High (consistency and clarity)

---

*Document Version: 1.0*  
*Last Updated: 2025-12-31*  
*Status: Ready for execution*
