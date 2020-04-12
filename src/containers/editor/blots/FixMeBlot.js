import React from 'react';
import { Quill } from 'react-quill';
import FixMe from '../../fixme';
import { Provider } from 'react-redux';
import configureStore from '../../../store';
import ReactDOM from 'react-dom';

let Embed = Quill.import('blots/embed');

class FixMeBlot extends Embed {
  static create(params) {
    console.error('create !', params);
    let node = super.create();
    node.dataset.id = params.id;

    ReactDOM.render(
      <React.StrictMode>
        <Provider store={configureStore()}>
          <FixMe onFixMeSelected={params.callback} id={params.id} />
        </Provider>
      </React.StrictMode>,
      node
    );
    return node;
  }

  static value(domNode) {
    return domNode.dataset.id;
  }
}

FixMeBlot.blotName = 'fixme';
FixMeBlot.tagName = 'span';
console.error('register');
Quill.register(FixMeBlot);
