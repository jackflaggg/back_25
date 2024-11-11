export const deviceMapper = (model: any) => {
    return {
        issuedAt: model.issuedAt,
        deviceId: model.deviceId,
        ip: model.ip,
        lastActiveDate: model.lastActiveDate,
        deviceName: model.deviceName,
        refreshToken: model.refreshToken,
    }
}