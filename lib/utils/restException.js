class PlivoRestError extends Error {
  constructor(response) {
    response = response.response
    var body;
    
    super('[HTTP ' + response.status + '] Failed to execute request');
     try {
        body = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        } catch (err) {
          body = {"error": response.data, "api_id": ''}
        }
    
    this.status = response.status;
    this.statusText = response.statusText
    this.message = body.error;
    this.apiID = body.api_id;
    this.moreInfo = response.config.data;
    this.errorCode = body["error code"];
    this.src = body.src;
    this.dest = body.dest;
    this.invalidNumbers = body.invalid_number;
    this.unMappedNumbers = body.unmapped_number;
    this.unMappedTendlcNumbers = body.unmapped_10dlc_numbers;
    this.brandTPDFailedNumbers = body.brand_tpd_failed_numbers;
    this.messageUUID = body.message_uuid;
  }
}

module.exports = PlivoRestError;