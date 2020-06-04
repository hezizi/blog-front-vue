export default {
  // articles
  hottest: state => state.article.hottest,
  latest: state => state.article.latest,
  // tags
  allTags: state => state.tag.allTags,
  selectedTag: state => state.tag.selectedTag
}