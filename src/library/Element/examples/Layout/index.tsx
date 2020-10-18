import * as React               from 'react';
import { RouteComponentProps }  from '@reach/router';

import Layout                from '@library/Element/examples/Layout/Layout';
import { ElementProps }         from '@library/Element';

const View: React.FC<RouteComponentProps & ElementProps> = (props) => {
    const { ...rest } = props;

    return (
        <Layout color='primary' spaced { ...rest }> 
            <Layout.Header>Layout header</Layout.Header>
            <Layout.Content>Layout content</Layout.Content>
            <Layout.Group>
                <Layout.Aside>Aside</Layout.Aside>
                <Layout> 
                    <Layout.Content>Layout header</Layout.Content>
                    <Layout.Content>Layout content</Layout.Content>
                    <Layout.Content>Layout content</Layout.Content>
                    <Layout.Group>
                        <Layout.Aside accent>Aside</Layout.Aside>
                        <Layout.Content>Content</Layout.Content>
                    </Layout.Group>
                    <Layout.Footer>Layout footer</Layout.Footer>
                </Layout>
            </Layout.Group>
            <Layout.Footer>Layout footer</Layout.Footer>
        </Layout>
    )
}

export default View;
