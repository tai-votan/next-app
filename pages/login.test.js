import React from "react";
import { mount } from "enzyme";
import Login from "./login";

describe("Login Component", () => {
  it("should render without crashing", () => {
    const wrapper = mount(<Login />);
    expect(wrapper.find("a")).toHaveLength(1);
  });
});
