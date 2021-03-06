
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
    this.moreInfo = response.config.data
  }
}

module.exports = PlivoRestError;
