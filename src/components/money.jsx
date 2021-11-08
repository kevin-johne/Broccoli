const Money = ({pence}) => {
  return `£${(pence / 100).toFixed(2)}`
}

export default Money;
