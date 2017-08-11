import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingIcon from './LoadingIcon';

const LoadMoreButton = ({ onclick }) => (
  <div className="compose__infinite-load-more__load-more-button">
    <a className="button transparent" onClick={onclick}>Load More</a>
  </div>
);

const LoadingIconWrapper = () => (
  <div className="compose__infinite-load-more__loading-icon-wrapper">
    <LoadingIcon />
  </div>
);

const NoResults = () => (
  <div className="compose__infinite-load-more__no-results">
    <label className="active lg">No results found</label>
  </div>
);

class InfiniteLoadMore extends Component {
  el = null;
  isInfinite = false;
  /**
    dispatched isFetching prop doesn't update quickly enough for onscroll events.
    as in the next scroll tick happens before isFetching is updated.
    add isLoadingMore flag that's updated in the right order in the call stack.
    if content isLoadingMore, do not trigger nextPage
  **/
  isLoadingMore = false;

  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    response: PropTypes.object.required,
    infiniteOnMount: PropTypes.bool,
    promptToLoadMore: PropTypes.bool,
    onNextPage: PropTypes.func.required,
    upperBoundOffset: PropTypes.number,
    lowerBoundOffset: PropTypes.number
  }

  static defaultProps = {
    infiniteOnMount: false,
    component: 'div',
    onNextPage: ()=>{},
    upperBoundOffset: -500,
    lowerBoundOffset: 50,
    promptToLoadMore: false
  }

  componentWillMount() {
    this.isInfinite = this.props.infiniteOnMount===true ? true : false;
  }

  shouldComponentUpdate(nextProps) {
    let { response, promptToLoadMore } = this.props;
    /**
      since we're subscribing to scrollPosition,
      this component gets reevaluated with each tick (/rerendered on each tick)
      this causes sluggish scrolling when the results array gets large.
      here we check the results and only rerender if we have new data.
    **/
    if(this.isInfinite && !this.isLoadingMore && !promptToLoadMore)
      this.nextPageOnEnd();

    if(!response.results) return false;

    if(response.results[0] && nextProps.response.results[0]){
      // TODO better check for new data
      if(response.results[0].id !== nextProps.response.results[0].id){
        if(!this.props.infiniteOnMount) this.isInfinite = false;
        return true;
      }
    }

    if(response.isFetching !== nextProps.response.isFetching) return true;

    return response.results.length !== nextProps.response.results.length;
  }

  nextPage = () => {
    let { onNextPage } = this.props;
    if(!this.isLoading){
      let fetchFn = onNextPage();
      if(!fetchFn) return;
      this.isLoadingMore = true;
      if(typeof fetchFn !== 'function')
        console.error('onNextPage prop must return async function with a callback parameter.');
      fetchFn(()=>{
        // give dispatch some time.
        setTimeout(()=>{ this.isLoadingMore = false;});
      });
    }
  }

  loadMore = () => {
    if(!this.props.promptToLoadMore) this.isInfinite = true;
    this.nextPage();
  }

  nextPageOnEnd = () => {
    if(!this.el) return;

    let { upperBoundOffset, lowerBoundOffset } = this.props;

    let distanceFromTop = -this.el.getBoundingClientRect().top;
    let bottom = this.el.offsetHeight;
    let end = bottom + upperBoundOffset;
    let limit = bottom + lowerBoundOffset;

    if(distanceFromTop>end && distanceFromTop<limit)
      this.nextPage();

  }

  render(){
    let { children, className, response } = this.props;
    let classes = `${this.isInfinite ? ' is-infinite' : ''}${this.isLoadingMore ? ' is-loading-more' : '' } ${response.isFetching ? ' is-fetching' : ''}`;

    return (
      <this.props.component
        ref={(el) => { this.el = el; }}
        className={'compose__infinite-load-more' + classes + ' ' + (className||'')}>
        {(response.results.length===0 && !response.isFetching && response.hasResults) &&
          <NoResults />
        }
        {children}
        {(response.hasNext && !this.isInfinite && !response.isFetching) &&
          <LoadMoreButton onclick={this.loadMore}/>
        }{response.isFetching &&
          <LoadingIconWrapper />
        }
      </this.props.component>
    );
  }
}

const mapStateToProps = (state) => ({
  siteScrollPosition: state.site.scroll.position // forces reevaluation on scroll
});

InfiniteLoadMore = connect(mapStateToProps)(InfiniteLoadMore);

export default InfiniteLoadMore;
