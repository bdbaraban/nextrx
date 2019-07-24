import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Link from 'next/link';
import { Heading } from 'grommet';
import { Logo, Title } from '../../components';

describe('Title', (): void => {
  it('Links to /athlete route', (): void => {
    const title = shallow(<Title />);
    expect(title.find(Link).prop('href')).toEqual('/athlete');
  });

  it('Renders Logo', (): void => {
    const title = shallow(<Title />);
    expect(title.find(Logo)).toHaveLength(1);
  });

  it('Renders Heading with "NextRX" title', (): void => {
    const title = shallow(<Title />);
    expect(
      title
        .find(Heading)
        .render()
        .text()
    ).toEqual('NextRX');
  });

  it('Matches snapshot', (): void => {
    const component = renderer.create(<Title />);
    const title = component.toJSON();
    expect(title).toMatchSnapshot();
  });
});
