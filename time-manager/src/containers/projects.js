import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {shouldFetch} from "../actions/projectsActions";
import React, {Component} from "react";
import Duration, {MyPagination} from "../pages/common";


class ProjectRow extends Component {
    render() {
        return <div className="card m-2 p-2">
            <h5>{this.props.project.name}</h5>
            <table className="table">
                <tbody>
                <tr>
                    <th>Time</th>
                    <td><Duration duration={this.props.project.worked_time}/></td>
                    <td>
                        <Link to={{pathname: '/project_detail', state: {project: this.props.project}}}>details</Link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    }
}

class ProjectList extends Component {
    componentDidMount() {
        this.props.fetchPage(1);
    }

    render() {
        return (<div>
            {this.props.totalPages > 1 &&
            <div className="mx-auto">
                <MyPagination currentPage={this.props.currentPage} callback={this.props.fetchPage}
                              totalPages={this.props.totalPages}/>
            </div>
            }
            {this.props.fetching === true &&
            <div className="spinner-border mx-auto" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            }
            {this.props.projects.map(project =>
                <ProjectRow project={project} key={project.name}/>)}
        </div>);
    }
}

const mapStateToProps = (state) => {
    let currentPage = state.projects.currentPage || 1;
    let page = state.projects.pages[currentPage];
    return {
        currentPage: currentPage,
        fetching: page ? page.fetching : false,
        projects: page ? page.items : [],
        totalPages: state.projects.totalPages
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchPage(page) {
        dispatch(shouldFetch(page))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);