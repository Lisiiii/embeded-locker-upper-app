import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SectionList,
    FlatList,
} from 'react-native';

import { LockerUnlockedIcon, LockerLockedIcon, PasswordIcon, FingerprintIcon, NFCCardIcon, SettingsIcon, TransferIcon } from '../assets/icons';

type DeviceInfo = {
    deviceName: string,
    batteryLevel: number,
    locked: boolean
}

type SettingsInfo = {
    passwordCount: number,
    passwordSetTime: number,
    fingerprintCount: number,
    nfcCardCount: number
}

type ActivityRecordInfo = {
    recordTime: string,
    recordText: string,
    recordResult: boolean
}

function DeviceBar({ deviceName, batteryLevel, locked }: DeviceInfo) {
    return (
        <View style={styles.header}>
            <View style={styles.deviceContainer}>
                <Text style={styles.deviceName}>{deviceName ? deviceName : "无设备"}</Text>
                <TouchableOpacity style={styles.switchDeviceButton}>
                    <Image source={TransferIcon} style={styles.switchDeviceButtonIcon} />
                    <Text style={styles.switchDeviceButtonText} >更换设备</Text>
                </TouchableOpacity>
            </View>
            <Text style={{
                ...styles.lockStatus,
                borderLeftColor: locked ? '#4CAF50' : '#F44336',
                color: locked ? '#4CAF50' : '#F44336'
            }}>{locked ? '已上锁' : '未上锁'}</Text>
            <View style={styles.batteryContainer}>
                <Text style={styles.batteryText}>电压</Text>
                <Text style={{ ...styles.batteryLevelText, color: batteryLevel > 3 ? 'green' : 'red' }}>{batteryLevel ? batteryLevel + "V" : "未知"}</Text>
                <View style={{ ...styles.batteryIndicator, backgroundColor: "#ccc" }}>
                    <View style={[styles.batteryLevel, { width: batteryLevel ? `${batteryLevel / 5.0 * 100}%` : '0%', backgroundColor: batteryLevel > 3 ? 'green' : 'red' }]} />
                </View>
            </View>
        </View>
    );
}

function SwitchLockerStatusButton() {
    return (
        <View style={styles.primaryActions}>
            <TouchableOpacity style={styles.actionButton}>
                <Image source={LockerUnlockedIcon} style={styles.actionIcon} />
                <Text style={styles.actionText}>解锁</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <Image source={LockerLockedIcon} style={styles.actionIcon} />
                <Text style={styles.actionText}>关锁</Text>
            </TouchableOpacity>
        </View>
    );
}

function SettingsButton({ passwordCount, passwordSetTime, fingerprintCount, nfcCardCount }: SettingsInfo) {
    return (
        <View style={styles.grid}>
            <TouchableOpacity style={styles.gridItem}>
                <Image source={PasswordIcon} style={styles.actionIcon} />
                <Text style={styles.gridText}>密码管理</Text>
                <Text style={styles.subText}>{passwordCount}个生效中·{passwordSetTime}天前设置</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
                <Image source={FingerprintIcon} style={styles.actionIcon} />
                <Text style={styles.gridText}>指纹管理</Text>
                <Text style={styles.subText}>{fingerprintCount}个指纹生效中</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
                <Image source={NFCCardIcon} style={styles.actionIcon} />
                <Text style={styles.gridText}>NFC卡设置</Text>
                <Text style={styles.subText}>{nfcCardCount}张卡生效中</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
                <Image source={SettingsIcon} style={styles.actionIcon} />
                <Text style={styles.gridText}>门锁设置</Text>
                <Text style={styles.subText}>更多设置...</Text>
            </TouchableOpacity>
        </View>
    );
}

function ActivityRecord({ activityRecordInfos }: { activityRecordInfos: ActivityRecordInfo[] }) {
    return (
        <View style={styles.recordItems}>
            <Text style={styles.recordTitle}>活动记录</Text>
            {activityRecordInfos.length > 0 ? (
                <FlatList
                    data={activityRecordInfos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.recordText}>
                            <Text style={styles.recordTime}>{item.recordTime}</Text>{' · '}{item.recordText}{' · '}
                            <Text style={[styles.recordResult, { color: item.recordResult ? '#4CAF50' : '#F44336' }]}>
                                {item.recordResult ? '成功' : '失败'}
                            </Text>
                        </Text>
                    )}
                    scrollEnabled={false}
                />
            ) : (
                <Text style={styles.recordText}>无记录</Text>
            )}
        </View>
    );
}

function ContactInfo() {
    return (
        <View style={styles.contactInfo}>
            <Text style={styles.contactText}>· 嵌入式大作业-智能门锁控制app</Text>
            <Text style={styles.contactText}>
                · 小组成员 <Text style={styles.phoneNumber}>张三·李四·王五</Text>
            </Text>
            <Text style={styles.contactText}>· 软件源代码: <Text style={{ ...styles.contactText, fontSize: 10 }}>https://github.com/lisiiii/SmartLocker-APP</Text></Text>
        </View>
    );
}

const testDeviceInfo: DeviceInfo = {
    deviceName: "SmartLocker V1",
    batteryLevel: 4.2,
    locked: true
}

const testSettingsInfo: SettingsInfo = {
    passwordCount: 2,
    passwordSetTime: 3,
    fingerprintCount: 1,
    nfcCardCount: 2
}

const testActivityRecordInfos: ActivityRecordInfo[] = [
    {
        recordTime: "2022-12-14 22:31:12",
        recordText: "指纹开门",
        recordResult: true
    },
    {
        recordTime: "2022-12-14 14:32:53",
        recordText: "自动关门",
        recordResult: true
    },
    {
        recordTime: "2022-12-14 14:32:11",
        recordText: "密码开门",
        recordResult: true
    }
]

export default function HomePage() {
    const sections = [
        { title: 'DeviceBar', data: [{ type: 'DeviceBar', info: testDeviceInfo }] },
        { title: 'SwitchLockerStatusButton', data: [{ type: 'SwitchLockerStatusButton' }] },
        { title: 'SettingsButton', data: [{ type: 'SettingsButton', info: testSettingsInfo }] },
        { title: 'ActivityRecord', data: [{ type: 'ActivityRecord', info: testActivityRecordInfos }] },
        { title: 'ContactInfo', data: [{ type: 'ContactInfo' }] },
    ];

    const renderItem = ({ item }: { item: any }) => {
        switch (item.type) {
            case 'DeviceBar':
                return <DeviceBar {...item.info} />;
            case 'SwitchLockerStatusButton':
                return <SwitchLockerStatusButton />;
            case 'SettingsButton':
                return <SettingsButton {...item.info} />;
            case 'ActivityRecord':
                return <ActivityRecord activityRecordInfos={item.info} />;
            case 'ContactInfo':
                return <ContactInfo />;
            default:
                return null;
        }
    };

    return (
        <SectionList
            sections={sections}
            keyExtractor={(item, index) => item.type + index}
            renderItem={renderItem}
            renderSectionHeader={() => null}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        flexGrow: 1,
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 16,
        flexDirection: 'column',
        alignItems: 'center'
    },
    deviceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginLeft: 0,
        marginRight: 'auto',
        paddingRight: 1
    },
    switchDeviceButton: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    switchDeviceButtonIcon: {
        height: 34,
        width: 34,
    },
    switchDeviceButtonText: {
        fontSize: 8,
        color: '#666',
    },
    deviceName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    lockStatus: {
        fontSize: 20,
        marginTop: 8,
        marginLeft: 0,
        marginRight: 'auto',
        borderLeftWidth: 4,
        paddingLeft: 8,
    },
    batteryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0,
        marginTop: 8,
        marginRight: 'auto'
    },
    batteryIndicator: {
        width: 50,
        height: 10,
        borderRadius: 8,
    },
    batteryText: {
        fontSize: 12,
        marginRight: 4
    },
    batteryLevelText: {
        fontSize: 12,
        marginRight: 8,
    },
    batteryLevel: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    primaryActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 12,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionIcon: {
        width: 30,
        height: 30,
        marginBottom: 8,
    },
    actionText: {
        fontSize: 14,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
        marginHorizontal: 4,
    },
    gridItem: {
        width: '48%',
        padding: 16,
        backgroundColor: '#fff',
        margin: '1%',
        borderRadius: 12,
        alignItems: 'flex-start',
    },
    gridIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    gridText: {
        fontSize: 14,
    },
    subText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    recordItems: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 8
    },
    recordTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
        paddingLeft: 8,
    },
    recordText: {
        fontSize: 14,
        margin: 8,
    },
    recordTime: {
        fontSize: 12,
        color: '#666',
    },
    recordResult: {
        fontSize: 12,
        color: '#4CAF50',
        textAlign: 'right',
    },
    contactInfo: {
        padding: 16,
    },
    contactText: {
        color: '#666',
        marginBottom: 8,
    },
    phoneNumber: {
        fontSize: 16,
        color: '#999',
    },
});

