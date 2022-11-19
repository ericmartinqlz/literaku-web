export default (context, inject) => {
  const baseapi = () => {
    return process.env.BASE_API
  }

  const groupArrayByValues = function (arr, key) {
    const objGrouped = arr.reduce(function (rv, x) {
      ;(rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})

    const arrGrouped = []
    const entries = Object.entries(objGrouped)
    entries.map(entry => {
      arrGrouped.push({
        title: entry[0],
        children: entry[1]
      })

      return entries
    })

    return arrGrouped
  }

  inject('baseapi', baseapi)
  inject('groupArrayByValues', groupArrayByValues)
}
