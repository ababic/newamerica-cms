import { fetchData, setParams } from './api/actions';
import { getNestedState, smoothScroll } from '../utils/index';
import store from './store';
import {
  SET_SCROLL_POSITION, SET_SCROLL_DIRECTION, ADD_SCROLL_EVENT,
  RELOAD_SCROLL_EVENT, RELOAD_SCROLL_EVENTS, SET_AD_HOC_STATE, SET_ANY_STATE,
  SET_SCROLL, SET_IS_SCROLLING, SET_SEARCH_STATE, TOGGLE_MOBILE_MENU, SET_SITE_BASEURL
} from './constants';


const findScrollEventBySelector = (selector) => {
  // assumes 1 event for each selector...
  let state = store.getState().site.scrollEvents;
  for(let i=0;i<state.length; i++){
    if(state[i].selector==selector){
      return {
        event: state[i],
        index: i
      };
    }
  }
  return null;
}

const observerFactory = function(stateName, onChange){
  let currentState;
  return function(){
    let nextState = getNestedState(store.getState(), stateName);
    if(nextState !== currentState) {
      onChange(nextState, currentState || nextState);
      currentState = nextState;
    }
  }
}

// actions
class Actions {
  setScrollPosition = (position) => {
    window.scrollTo(0, position);
    store.dispatch({
      type: SET_SCROLL_POSITION,
      position,
      component: 'site'
    });
    return this;
  }

  setScroll = ({ position, direction }) => {
    store.dispatch({
      type: SET_SCROLL,
      scroll: { position, direction },
      component: 'site'
    });

    return this;
  }

  addScrollEvent = ({
    onEnter, onLeave, onTick, enter, leave, offset, topOffset, bottomOffset,
    triggerPoint, selector, target
  }) => {
    let els = document.querySelectorAll(selector);
    store.dispatch({
      type: ADD_SCROLL_EVENT,
      component: 'site',
      eventObject: {
        onEnter, onLeave, onTick, enter, leave, selector,
        offset, topOffset, bottomOffset, triggerPoint, els, target
      }
    });

    return this;
  }

  smoothScroll = smoothScroll

  setScrollDirection = (direction) => {
    store.dispatch({
      type: SET_SCROLL_DIRECTION,
      component: 'site',
      direction
    });
    return this;
  }

  setIsScrolling = (isScrolling) => {
    store.dispatch({
      type: SET_IS_SCROLLING,
      component: 'site',
      isScrolling
    });
    return this;
  }

  reloadScrollEvents = (selector) => {
    let event;
    if(selector){
      event = findScrollEventBySelector(selector);
      if(!event) return this.addScrollEvent({selector});
    }
    store.dispatch({
      type: event ? RELOAD_SCROLL_EVENT : RELOAD_SCROLL_EVENTS,
      component: 'site',
      event
    });

    return this;
  }

  setState = (component, state) => {
    store.dispatch({
      type: SET_ANY_STATE,
      component,
      state
    });
  }

  getState = (name) => {
    return getNestedState(store.getState(), name);
  }

  addAdHocObserver = ({ stateName, onChange }) => {
    let observer = observerFactory(`site.adHoc.${stateName}`, onChange);
    store.subscribe(observer);
    return this;
  }

  addObserver = ({ stateName, onChange }) => {
    if(this.getState(stateName)===undefined) this.setState(stateName, null);
    let observer = observerFactory(stateName, onChange);
    store.subscribe(observer);
    return this;
  }

  toggleSearch = (state) => {
    if(state===undefined) state = !this.getState('site.searchIsOpen');
    store.dispatch({
      type: SET_SEARCH_STATE,
      component: 'site',
      state
    });

    return this;
  }

  toggleMobileMenu = (_isOpen) => {
    let state = _isOpen !== undefined ? _isOpen : !getNestedState(store.getState(), 'site.mobileMenuIsOpen');
    store.dispatch({
      type: TOGGLE_MOBILE_MENU,
      component: 'site',
      state
    });
  }

  setSiteBaseUrl = (url) => {
    store.dispatch({
      type: SET_SITE_BASEURL,
      component: 'site',
      url
    });
  }
}

const actions = new Actions();
export default actions;
