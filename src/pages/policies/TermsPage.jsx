import LegalLayout, { LegalList } from '../../components/LegalLayout'

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      description="Terms governing use of Assignment Solution academic support services."
      path="/terms-and-conditions"
    >
      <p>
        By placing an order with Assignment Solution you confirm that the information you provide is accurate and
        that you will use delivered materials as learning support in line with your institution&apos;s academic
        integrity policies.
      </p>
      <LegalList
        items={[
          'Quotes are estimates until confirmed after brief review.',
          'Deadlines begin after requirements, payment milestones, and files are confirmed.',
          'Clients remain responsible for how they submit or cite work at their institutions.',
          'Abuse, fraud, or harassment toward staff may result in account suspension.',
        ]}
      />
      <p>We may update these terms; continued use after notice constitutes acceptance of revisions.</p>
    </LegalLayout>
  )
}
