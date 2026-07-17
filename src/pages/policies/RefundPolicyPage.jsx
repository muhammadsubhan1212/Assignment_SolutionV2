import LegalLayout, { LegalList } from '../../components/LegalLayout'
import { brand } from '../../data/brand'

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      title="Refund Policy"
      description="Clear refund and cancellation terms for Assignment Solution orders."
      path="/refund-policy"
    >
      <p>Assignment Solution aims for fair resolution when work cannot proceed or delivery fails under confirmed terms.</p>
      <LegalList
        items={[
          'Cancellations before writer assignment may qualify for a full refund of amounts paid.',
          'After drafting begins, refunds are partial and based on completed milestones.',
          'Quality disputes should open with revision requests first when feasible.',
          'Chargebacks without contacting support may delay investigation outcomes.',
        ]}
      />
      <p>Email {brand.email} with your order ID to start a refund review.</p>
    </LegalLayout>
  )
}
