import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Slider from "react-slick";

import { selectSelectedLanguage } from "../multiLanguage/reducer";
import {
  fetchNews,
  fetchNewsAndCategories,
  getNews,
  getNewsPage,
  resetNews,
  getCategories
} from "./actions";
import {
  selectNewsList,
  selectCategories,
  selectCategoryUrl,
  selectCategoryTitle,
  selectCategoryColor,
  selectTitle,
  selectPagination,
  selectMetaTitle,
  selectDescription,
  selectSummary,
  selectDateTimestamp
} from "./reducer";
import {
  REDUCER_NAME,
  PAGE_NUMBER_QUERY_STRING_PARAM,
  PAGE_SIZE_QUERY_STRING_PARAM,
  PAGE_SIZE_VALUE,
  DEFAULT_PAGE,
  DATA_TTL
} from "./constants";
import withPage from "../page/withPage";
import NewsSection from "../../components/home/newsSection";
import Pagination from "../../components/pagination/pagination";
import { getParameterByName } from "../../util/util";

var settings = {
  className: "slider variable-width",
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true
};

class News extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChangePageClick = this.handleChangePageClick.bind(this);
  }

  componentDidMount() {
    const {
      selectedLanguage,
      onLoadNews,
      onLoadCategories,
      categoryTitle,
      match
    } = this.props;
    const linkName = match.url.split("/")[2];
    const category = match.url.split("/")[3];

    const page =
      getParameterByName(PAGE_NUMBER_QUERY_STRING_PARAM, location.search) ||
      DEFAULT_PAGE;
    const pageSize =
      getParameterByName(PAGE_SIZE_QUERY_STRING_PARAM, location.search) ||
      PAGE_SIZE_VALUE;

    if (category && category.indexOf("-category") !== -1) {
      this.props.onResetNews();
      onLoadCategories({
        title: category.replace(/-/g, " "),
        selectedLanguage
      });
    } else {
      onLoadNews({
        page,
        pageSize,
        language: selectedLanguage,
        linkName
      });
    }
  }

  componentWillUnmount() {
    this.props.onResetNews();
  }

  handleChangePageClick(e) {
    const { selectedLanguage, onLoadNews, match } = this.props;
    const linkName = match.url.split("/")[2];
    e.preventDefault();

    let page =
      getParameterByName(PAGE_NUMBER_QUERY_STRING_PARAM, e.target.href) ||
      DEFAULT_PAGE;
    const pageSize =
      getParameterByName(PAGE_SIZE_QUERY_STRING_PARAM, e.target.href) ||
      PAGE_SIZE_VALUE;

    window.history.pushState(null, "", e.target.href);

    return onLoadNews({
      page,
      pageSize,
      language: selectedLanguage,
      linkName
    });
  }

  render() {
    const {
      title,
      newsList,
      categories,
      categoryTitle,
      pagination,
      match,
      metaTitle,
      description,
      summary
    } = this.props;
    const category = match.url.split("/")[3];

    const categoryColor = category ? this.props.categoryColor : "transparent";
    let page, pageCount;
    if (pagination) {
      page = parseInt(pagination.get("page"));
      pageCount = parseInt(pagination.get("pageCount"));
    }

    let queryParams = {
      PAGE_NUMBER_QUERY_STRING_PARAM,
      PAGE_SIZE_QUERY_STRING_PARAM,
      PAGE_SIZE_VALUE
    };
    const urlWithQueryString = `${match.url}?${queryParams.PAGE_NUMBER_QUERY_STRING_PARAM}=${page}&${queryParams.PAGE_SIZE_QUERY_STRING_PARAM}=${queryParams.PAGE_SIZE_VALUE}`;
    return (
      <div className="news">
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={description} />
        </Helmet>
        <section className="home__section">
          <div className="home__section__title">
            <h1 style={{ textAlign: "center" }}>{title}</h1>
            <p style={{ textAlign: "center", textTransform: "none" }}>
              {summary}
            </p>
            <Slider {...settings}>
              {!!categories.size &&
                categories.map((category, index) => (
                  <div className="news-categories_title" key={index}>
                    <a
                      className="news-categories__button"
                      style={{
                        backgroundColor:
                          categoryTitle.toLowerCase() ===
                          category.get("title").toLowerCase()
                            ? "#" + categoryColor
                            : "transparent"
                      }}
                      href={category.get("url")}
                    >
                      {category.get("title")}
                    </a>
                    <span className="news-categories__ellipse">●</span>
                  </div>
                ))}
            </Slider>
          </div>
          <div className="home__section__content">
            <NewsSection news={newsList} returnUrl={urlWithQueryString} />
            <Pagination
              displayInfo={false}
              page={page}
              pageCount={pageCount}
              url={match.url}
              onChangePageClick={this.handleChangePageClick}
              queryParams={queryParams}
            />
          </div>
        </section>
      </div>
    );
  }

  static fetchData(store, { url, query, language }) {
    const page = query[PAGE_NUMBER_QUERY_STRING_PARAM] || DEFAULT_PAGE;
    const pageSize = query[PAGE_SIZE_QUERY_STRING_PARAM] || PAGE_SIZE_VALUE;
    const linkName = url.split("/")[2];
    const category = url.split("/")[3];

    if (category && category.indexOf("-category") !== -1) {
      return store.dispatch(
        fetchNewsAndCategories({
          url,
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          language,
          linkName,
          title: category.replace(/-/g, " ")
        })
      );
    }

    return store.dispatch(
      fetchNews({
        url,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        language,
        linkName
      })
    );
  }
}

const mapStateToProps = createStructuredSelector({
  title: selectTitle,
  newsList: selectNewsList,
  categories: selectCategories,
  categoryUrl: selectCategoryUrl,
  categoryTitle: selectCategoryTitle,
  categoryColor: selectCategoryColor,
  pagination: selectPagination,
  metaTitle: selectMetaTitle,
  description: selectDescription,
  summary: selectSummary,
  dataTimestamp: selectDateTimestamp,
  selectedLanguage: selectSelectedLanguage
});

const mapDispatchToProps = dispatch => ({
  onLoadNews: data => dispatch(getNews(data)),
  onLoadCategories: data => dispatch(getCategories(data)),
  onResetNews: data => dispatch(resetNews(data))
});

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(News),
  getNewsPage,
  REDUCER_NAME
);
