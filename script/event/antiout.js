module.exports.config = {
  name: "antiout",
  version: "1.0.0"
};
module.exports.handleEvent = async ({
  event,
  api
}) => {
  if (event.logMessageData?.leftParticipantFbId === api.getCurrentUserID()) return;
  if (event.logMessageData?.leftParticipantFbId) {
    const info = await api.getUserInfo(event.logMessageData?.leftParticipantFbId);
    const {
      name
    } = info[event.logMessageData?.leftParticipantFbId];
    api.addUserToGroup(event.logMessageData?.leftParticipantFbId, event.threadID, (error) => {
      if (error) {
        api.sendMessage(`Unable to re-add ni ${name} kay wala fay permission or gi block kos animal.`, event.threadID);
      } else {
        api.sendMessage(`Bawal mo left  ${name} uy! basta mo left ka'g usab it means baho kag bugan.`, event.threadID);
      }
    });
  }
};
