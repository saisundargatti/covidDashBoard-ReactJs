import './index.css'

const FaqItem = props => {
  const {faqDetails} = props
  const {answer, question} = faqDetails

  return (
    <li>
      <p className="faq-question">{question}</p>
      <p className="faq-answer">{answer}</p>
    </li>
  )
}

export default FaqItem
