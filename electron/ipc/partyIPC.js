import { ipcMain } from "electron";

export   function registerPartyHandlers(partyService){

    ipcMain.handle('addParty',(event ,partyData)=>{
        return partyService.newParty(partyData);
  
    });

    ipcMain.handle('searchParty',(event ,party)=>{
      return partyService.findParty(party);
  });
}

