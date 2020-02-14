import React, {Component, ReactPropTypes as PropTypes} from 'react';

const range = (start, stop) => {
    return [...Array(stop - start).keys()].map(v => v + start)
};

class MyPagination extends Component {
    render() {
        const {padding = 2, currentPage, totalPages, callback} = this.props;
        const pagesBefore = range(currentPage - padding, currentPage);
        const pagesAfter = range(currentPage + 1, currentPage + padding + 1);

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">

                    <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                        <span className="page-link" onClick={() => callback(1)}>&laquo;</span>
                    </li>
                    <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                        <span className="page-link"
                              onClick={() => callback(pagesBefore[pagesBefore.length - 1])}>&lsaquo;</span>
                    </li>

                    {pagesBefore.map(page =>
                        <li className={page > 0 ? 'page-item' : 'page-item disabled'}>
                            <span className="page-link" onClick={() => callback(page)}>{page > 0 ? page : ''}</span>
                        </li>
                    )}

                    <li className="page-item active">
                        <span className="page-link">{currentPage}</span>
                    </li>

                    {pagesAfter.map(page =>
                        <li className={page <= totalPages ? 'page-item' : 'page-item disabled'}>
                            <span className="page-link"
                                  onClick={() => callback(page)}>{page <= totalPages ? page : ''}</span>
                        </li>
                    )}

                    <li className={currentPage === totalPages ? 'page-item disabled' : 'page-item'}>
                        <span className="page-link" onClick={() => callback(pagesAfter[0])}>&rsaquo;</span>
                    </li>
                    <li className={currentPage === totalPages ? 'page-item disabled' : 'page-item'}>
                        <span className="page-link"
                              onClick={() => callback(totalPages)}>&raquo;</span>
                    </li>
                </ul>
            </nav>
        )
    }
}

class Duration extends Component {
    render() {
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>days</th>
                        <td>{this.props.duration.days}</td>
                    </tr>
                    <tr>
                        <th>hours</th>
                        <td>{this.props.duration.hours}</td>
                    </tr>
                    <tr>
                        <th>minutes</th>
                        <td>{this.props.duration.minutes}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Duration;
export {range};
export {MyPagination};