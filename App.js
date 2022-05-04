import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import LoginScreen from './LoginScreen';

const HomeScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>MeetPet</Text>
    </Layout>
);

export default () => (
    <ApplicationProvider {...eva} theme={eva.light}>
        <LoginScreen/>
    </ApplicationProvider>
);