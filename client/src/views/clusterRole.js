import _ from 'lodash';
import React from 'react';
import Base from '../components/base';
import api from '../services/api';
import ItemHeader from '../components/itemHeader';
import Loading from '../components/loading';
import MetadataFields from '../components/metadataFields';
import {TableBody} from '../components/listViewHelpers';
import SaveButton from '../components/saveButton';
import DeleteButton from '../components/deleteButton';

const service = api.clusterRole;

export default class ClusterRole extends Base {
    componentDidMount() {
        const {name} = this.props;

        this.registerApi({
            item: service.get(name, item => this.setState({item})),
        });
    }

    render() {
        const {name} = this.props;
        const {item} = this.state || {};
        const rules = item && item.rules;

        return (
            <div id='content'>
                <ItemHeader title={['Cluster Role', name]} ready={!!item}>
                    <>
                        <SaveButton
                            item={item}
                            onSave={x => service.put(x)}
                        />

                        <DeleteButton
                            onDelete={() => service.delete(name)}
                        />
                    </>
                </ItemHeader>

                <div className='contentPanel'>
                    {!item ? <Loading /> : (
                        <div>
                            <MetadataFields item={item} />
                        </div>
                    )}
                </div>

                <div className='contentPanel_header'>Rules</div>
                <div className='contentPanel'>
                    <table>
                        <thead>
                            <tr>
                                <th>Resources</th>
                                <th>Non Resource</th>
                                <th>Names</th>
                                <th>Verbs</th>
                                <th>Groups</th>
                            </tr>
                        </thead>

                        <TableBody items={rules} colSpan='4' row={(x, i) => (
                            <tr key={i}>
                                <td>{_.map(x.resources, toDiv)}</td>
                                <td>{_.map(x.nonResourceURLs, toDiv)}</td>
                                <td>{_.map(x.resourceNames, toDiv)}</td>
                                <td>{_.map(x.verbs, toDiv)}</td>
                                <td>{_.map(x.apiGroups, toDiv)}</td>
                            </tr>
                        )} />
                    </table>
                </div>
            </div>
        );
    }
}

function toDiv(item) {
    return (<div>{item}</div>);
}
