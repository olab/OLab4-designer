// @flow
/* eslint-disable no-return-assign, no-param-reassign */
/* eslint-disable react/no-array-index-key, jsx-a11y/label-has-for */
import React, { Component } from 'react';


type IBwdlNodeFormProps = {
  bwdlNode: any;
  bwdlNodeKey: string;
  nextChoices: string[];
};

class BwdlNodeForm extends Component<IBwdlNodeFormProps> {
  renderNextOptions(value: any) {
    const { nextChoices } = this.props;

    // This function is defined and used locally to avoid tslint's jsx-no-lambda error.
    // It requires the local value variable, so it cannot be defined in the class.
    const handleChange = (event: any) => {
      event.target.value = value;
    };

    return (
      <select
        defaultValue={value}
        onChange={handleChange}
      >
        {nextChoices.map(choice => (<option key={choice}>{choice}</option>))}
      </select>
    );
  }

  renderAndObjectArray(andObjectArray: any[]) {
    return andObjectArray.map((andObject, index) => (
      <div className="and-object" key={index}>
        {Object.keys(andObject).map(key => (
          <div className="and-object-value" key={key}>
            <label htmlFor={key}>
              {`${key}:`}
            </label>
            {' '}
            {this.renderKey(key, andObject[key])}
          </div>
        ))}
      </div>
    ));
  }

  renderChoicesOptions(value: any) {
    return value.map((choice, index) => (
      <div key={index} className="choices">
        {Object.keys(choice).map((choiceOption) => {
          if (choiceOption === 'Next') {
            // "Next" option
            return (
              <div key={choiceOption}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="">Next:</label>
                {' '}
                {this.renderNextOptions(choice[choiceOption])}
              </div>
            );
          }

          if (Array.isArray(choice[choiceOption])) {
            // "And" array
            return (
              <div key={choiceOption}>
                <label htmlFor="a">
                  {`${choiceOption}:`}
                </label>
                {' '}
                {this.renderAndObjectArray(choice[choiceOption])}
              </div>
            );
          }
          // text option
          return (
            <div key={choiceOption}>
              <label htmlFor="a">
                {`${choiceOption}:`}
              </label>
              {' '}
              {choice[choiceOption]}
            </div>
          );
        })}
      </div>
    ));
  }

  renderKey(key: string, value: any) {
    if (key === 'Next') {
      return this.renderNextOptions(value);
    }

    if (key === 'Choices') {
      return this.renderChoicesOptions(value);
    }

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      return Object.keys(value).map(valueKey => (
        <div key={valueKey} className="node-property node-sub-property">
          <label htmlFor="a">
            {`${valueKey}:`}
          </label>
          {' '}
          {this.renderKey(valueKey, value[valueKey])}
        </div>));
    }

    return (<pre>{JSON.stringify(value, null, 2)}</pre>);
  }

  render() {
    const { bwdlNode, bwdlNodeKey } = this.props;

    return (
      <div>
        <h2>{bwdlNodeKey}</h2>
        {Object.keys(bwdlNode).map(key => (
          <div key={key} className="node-property">
            <label htmlFor={key}>
              {`${key}:`}
            </label>
            {' '}
            {this.renderKey(key, bwdlNode[key])}
          </div>))}
      </div>
    );
  }
}

export default BwdlNodeForm;
