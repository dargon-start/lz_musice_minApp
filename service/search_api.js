import lzReques from './index';

//热门搜索
export function getSearchHot(params) {
  return lzReques.get('/search/hot');
}
//搜索建议
export function  getSearchSuggest(keywords) {
    return lzReques.get(`/search/suggest?keywords=${keywords}&type=mobile`);
}
//搜索结果
export function  getSearchResult(keywords,limit=30,offset=0) {
    return lzReques.get(`/search?keywords=${keywords}&limit=${limit}&offset=${offset}`)
}

