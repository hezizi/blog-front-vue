export default {
  // user
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  // tags
  allTags: state => state.tag.allTags,
  selectedTag: state => state.tag.selectedTag
}
