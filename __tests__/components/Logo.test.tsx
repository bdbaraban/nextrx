import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Logo } from '../../components';

describe('Logo', (): void => {
  it('Sets default width when not passed size prop', (): void => {
    const logo = shallow(<Logo />);
    expect(logo.prop('width')).toEqual(42);
  });

  it('Sets default height when not passed size prop', (): void => {
    const logo = shallow(<Logo />);
    expect(logo.prop('height')).toEqual(42);
  });

  it('Sets width based on passed size prop', (): void => {
    const logo = shallow(<Logo size={72} />);
    expect(logo.prop('width')).toEqual(72);
  });

  it('Sets height based on passed size prop', (): void => {
    const logo = shallow(<Logo size={72} />);
    expect(logo.prop('height')).toEqual(72);
  });

  it('Matches snapshot', (): void => {
    const component = renderer.create(<Logo />);
    const logo = component.toJSON();
    expect(logo).toMatchSnapshot();
  });
});
