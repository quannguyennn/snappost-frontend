import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'

export default function (BaseComponent) {
    class ComponentWrapped extends Component {
        constructor(props) {
            super(props)
            this.props = props
            this.state = {
                token: ""
            }
        }

        componentDidMount() {
            this.setState({
                token: localStorage.getItem('token')
            })
            this._checkAndRedirect()
        }

        componentDidUpdate(prevProps, prevState) {
            if (prevState.token !== this.state.token) {
                this._checkAndRedirect();
            }
        }

        _checkAndRedirect() {
            const { router } = this.props;

            if (this.state.token == "") {
                if (router.pathname != "/auth") {
                    router.push("/auth")
                }
            } else {
                if (router.pathname == "/auth") {
                    router.push("/")
                }
            }
        }

        render() {
            return (
                <div>
                    {(this.state.token == "") ? <BaseComponent {...this.props} /> : null}
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            token: state.userReducer.token
        };
    };

    return withRouter(connect(
        mapStateToProps
    )(ComponentWrapped));
}
