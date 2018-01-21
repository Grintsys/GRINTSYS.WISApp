export default {
  // Functions return fixtures
  getHomeWork: () => {
    return {
      ok: true,
      data: require('../Fixtures/homework.json')
    }
  },
}