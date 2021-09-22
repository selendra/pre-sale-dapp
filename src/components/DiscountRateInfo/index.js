import { Popover } from "antd"
import { ReactComponent as Question } from 'assets/question.svg'

export default function DiscountRateInfo() {
  const content = (
    <div>
      <ul>
        <li>1 year vesting: 10% discount</li>
        <li>2 year vesting: 20% discount</li>
        <li>3 year vesting: 30% discount</li>
      </ul>
    </div>
  );

  return (
    <Popover content={content}>
      <Question />
    </Popover>
  )
}
