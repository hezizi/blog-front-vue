export default {
  // user
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  // article
  allPosts: state => state.article.allPosts,
  // tags
  allTags: state => state.tag.allTags,
  selectedTag: state => state.tag.selectedTag
}
