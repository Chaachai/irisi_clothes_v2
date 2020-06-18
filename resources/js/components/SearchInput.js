import React, { Component } from "react";
import { Link } from "react-router-dom";

// import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../../css/autoComplete.css";

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.items = [];
        this.state = {
            suggestions: []
        };
    }

    OnTextChanged = e => {
        console.log("TEXT CHANGD !!!!");
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regs = new RegExp(`^${value}`, "i");
            suggestions = this.items.sort().filter(v => regs.test(v));
        }
        this.setState(() => ({
            suggestions,
            text: value
        }));
    };

    suggestionSelected(value) {
        this.setState(() => ({
            text: value,
            suggestions: []
        }));
    }
    renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <div className="autocomplete-items">
                {this.state.suggestions.slice(0, 5).map(item => (
                    <div onClick={() => this.suggestionSelected(item)}>
                        <strong>{item.slice(0, 2)}</strong>
                        {item.slice(2)}
                    </div>
                ))}
            </div>
        );
    }
    componentDidMount() {
        axios.get("/api/keywords").then(result => {
            result.data.forEach(element => {
                this.items.push(element.keyword);
            });
            // console.log("les keywords vvvv", this.items);
        });
    }

    render() {
        const { text } = this.state;
        return (
            <form style={{ paddingRight: 50 }}>
                <div className="autocomplete">
                    <FormControl
                        style={{
                            borderColor: "#096ced",
                            borderWidth: 1,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 18,
                            borderTopLeftRadius: 18
                        }}
                        value={text}
                        onChange={this.OnTextChanged}
                        type="text"
                        placeholder="Search ..."
                    ></FormControl>
                    {this.renderSuggestions()}
                </div>
                <Link to={"/showSearchResult/" + text}>
                    <Button
                        style={{
                            borderBottomRightRadius: 18,
                            borderTopLeftRadius: 18,
                            fontSize: 14
                        }}
                        type="submit"
                    >
                        Search
                    </Button>
                </Link>
            </form>

            // <Form style={{ paddingRight: 50 }} inline>
            //     <FormControl
            //         value={text}
            //         onChange={this.OnTextChanged}
            //         type="text"
            //         placeholder="Search"
            //         className=" mr-sm-2"
            //         style={{ width: 450 }}
            //     />
            //     {/* <Button type="submit">Submit</Button> */}
            //     {this.renderSuggestions()}
            // </Form>
        );
    }
}

export default SearchInput;
