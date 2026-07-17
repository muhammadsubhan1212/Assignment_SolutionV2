import LegalLayout, { LegalList } from '../../components/LegalLayout'
import { brand } from '../../data/brand'

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="How Assignment Solution collects, uses, and protects student information."
      path="/privacy-policy"
    >
      <p>
        Assignment Solution collects only the information needed to process orders and communicate with you —
        typically your name, email, phone number, and project files.
      </p>
      <LegalList
        items={[
          'We do not sell personal data to third parties.',
          'Each order receives an internal reference ID for support continuity.',
          'Access to files is limited to staff assigned to your brief.',
          'You may request correction or deletion of personal data by contacting support.',
        ]}
      />
      <p>
        Payment providers may process transaction data under their own policies. Contact {brand.email} for privacy
        requests.
      </p>
    </LegalLayout>
  )
}
