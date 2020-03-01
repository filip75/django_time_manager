import React, {Component} from 'react';
import {Link} from 'react-router-dom'


class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        fetch(this.props.project.users)
            .then(res => res.json())
            .then(data => {
                this.setState({users: data})
            })
    }

    render() {
        return (
            <table className="table">
                <tbody>
                {this.state.users.map(user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td><Link to='/'>details</Link></td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        );
    }
}

class ProjectPage extends Component {
    render() {
        const {state: {project}} = this.props.location;
        return (
            <div>
                <h5>
                    {project.name}
                </h5>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>name</th>
                        <td>{project.name}</td>
                    </tr>
                    <tr>
                        <th>worked time</th>
                        <td>{project.worked_time.days}</td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    {JSON.stringify(project)}
                </div>
                <UserTable project={project}/>
            </div>
        )
    }
}

export default ProjectPage