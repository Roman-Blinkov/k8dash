import React from 'react';
import Field from './field';
import formatDate from '../utils/dates';
import {objectMap} from './listViewHelpers';

const MetadataFields = ({item}) => (
    <>
        <Field name='Name' value={item.metadata.name} />
        <Field name='Kind' value={item.kind} />

        {item.metadata.namespace && (
            <Field name='Namespace' value={item.metadata.namespace} />
        )}

        <Field name='Created'>
            {formatDate(item.metadata.creationTimestamp)}
        </Field>

        {item.metadata.labels && (
            <Field name='Labels'>
                {objectMap(item.metadata.labels)}
            </Field>
        )}

        {item.metadata.annotations && (
            <Field name='Annotations'>
                {objectMap(item.metadata.annotations)}
            </Field>
        )}

        <Field name='Version' value={item.metadata.resourceVersion} />
    </>
);

export default MetadataFields;
