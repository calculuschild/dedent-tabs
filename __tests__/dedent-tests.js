// @flow

import dd from '../dedent';

describe("dedent", () => {
  it("works without interpolation", () => {
    expect(
      dd`first
         second
         third`
    ).toMatchSnapshot();
  });

  it("works with interpolation", () => {
    expect(
      dd`first ${"line"}
         ${"second"}
         third`
    ).toMatchSnapshot();
  });

  it("works with newlines in interpolation", () => {
    let interp1 = dd`second
                       third
                     fourth`;
    let interp2 = dd`fifth again
                       sixth
                     seventh`;
    expect(
      dd`first
         ${interp1}
         fifth ${interp2}
         eighth`
    ).toMatchSnapshot();
  });

  it("works with non-string values in interpolation", () => {
    let interp1 = 2;
    let interp2 = undefined;
    let interp3 = null;
    let interp4 = true;
    let interp5 = {myObj : "myObj"};
    expect(
      dd`first
         ${interp1}
         ${interp2}
         ${interp3}
         ${interp4}
         ${interp5}
         third`
    ).toMatchSnapshot();
  });

  it("works with suppressed newlines", () => {
    expect(
      dd`first \
         ${"second"}
         third`
    ).toMatchSnapshot();
  });

  it("works with blank first line", () => {
    expect(dd`
      Some text that I might want to indent:
        * reasons
        * fun
      That's all.
    `).toMatchSnapshot();
  });

  it("works with multiple blank first lines", () => {
    expect(
      dd`

         first
         second
         third`
    ).toMatchSnapshot();
  });

  it("works with removing same number of spaces", () => {
    expect(
      dd`
         first
            second
               third
      `
    ).toMatchSnapshot();
  });

  describe("single line input", () => {
    it("works with single line input", () => {
      expect(dd`A single line of input.`).toMatchSnapshot();
    });

    it("works with single line and closing backtick on newline", () => {
      expect(dd`
        A single line of input.
      `).toMatchSnapshot();
    });

    it("works with single line and inline closing backtick", () => {
      expect(dd`
        A single line of input.`
      ).toMatchSnapshot();
    });
  });

  it("can be used as a function", () => {
    expect(dd(`
      A test argument.
    `)).toMatchSnapshot();
  });

  it("escapes backticks", () => {
    expect(dd`\``).toMatchSnapshot();
  });

  it("escapes dollar signs and open braces", () => {
    expect(
      dd`The following template expression should not be evaluated and escape correctly: \$\{test expression}`
    ).toMatchSnapshot();
  });

  it("doesn't strip exlicit newlines", () => {
    expect(dd`
      <p>Hello world!</p>\n
    `).toMatchSnapshot();
  });

  it("doesn't strip exlicit newlines with mindent", () => {
    expect(dd`
      <p>
        Hello world!
      </p>\n
    `).toMatchSnapshot();
  });

  /* eslint-disable indent */
  it("works with tabs for indentation", () => {
    expect(
      dd`
			first
				second
					third
			`
    ).toMatchSnapshot();
  });

  it("works with escaped tabs for indentation", () => {
    expect(
      dd("\t\tfirst\n\t\t\tsecond\n\t\t\t\tthird")
    ).toMatchSnapshot();
  });
  /* eslint-enable indent */

  /* eslint-disable no-useless-escape */
  it("escapes template string expressions consistently", () => {
    expect(dd`\$\{Hi}`).toEqual(dd("\$\{Hi}"));
  });
  /* eslint-enable no-useless-escape */
});
