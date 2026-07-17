import LegalLayout, { LegalList } from '../../components/LegalLayout'

export default function RevisionPolicyPage() {
  return (
    <LegalLayout
      title="Revision Policy"
      description="Assignment Solution revision windows and what qualifies as complimentary edits."
      path="/revision-policy"
    >
      <p>
        Complimentary revisions are available when feedback stays within the original brief, marking rubric, and
        agreed word count.
      </p>
      <LegalList
        items={[
          'Request revisions within the window stated on your order confirmation.',
          'Provide specific comments — page numbers, rubric criteria, or tracked changes help.',
          'Scope changes, new chapters, or longer lengths may require a new quote.',
          'Urgent re-delivery windows depend on writer availability after the first handoff.',
        ]}
      />
    </LegalLayout>
  )
}
