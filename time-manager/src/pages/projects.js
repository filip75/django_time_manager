import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Duration, {MyPagination, range} from './common'

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

class ProjectTable extends Component {

    state = {
        response: {},
        currentPage: 1,
        pageCount: 1
    };

    fetchData(limit = 30, offset = 0) {
        fetch(`http://192.168.99.100:8000/projects/?limit=${limit}&offset=${offset}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    response: data,
                    pageCount: Math.ceil(data.count / 30)
                })
            });
    }

    componentDidMount() {
        this.fetchData();
        this.setPage = this.setPage.bind(this);
    }

    setPage(pageNumber) {
        this.fetchData(30, 30 * (pageNumber - 1));
        this.setState({currentPage: pageNumber})
    }

    render() {
        const rows = [];
        const projects = this.state.response.results ? this.state.response.results : [];
        projects.forEach(project => {
            rows.push(<ProjectRow project={project} key={project.name}/>)
        });
        return (
            <div>
                <MyPagination currentPage={this.state.currentPage} totalPages={this.state.pageCount}
                              callback={this.setPage}/>
                {rows}
            </div>
        )
    }
}

export default ProjectTable;