const pool = require('../config/DBConnection');

/**
 * @typedef {{
 *  id: number,
 *  success: string,
 *  take_away: string,
 *  owner_id: string,
 *  created_date: string,
 *  modified_date: string
 * }} reflectionRow
 */

class Reflection {
  /**
   * @param {string} success
   * @param {string} low_point
   * @param {string} take_away
   * @param {number} owner_id
   * @return {void}
   */
  constructor(success, low_point, take_away, owner_id) {
    this.success = success;
    this.low_point = low_point;
    this.take_away = take_away;
    this.owner_id = owner_id;
  }

  /**
   * @function save
   * @return {Promise<{success: boolean, error?: Error}>}
   */
  async save() {
    try {
      await pool.query(
        `
          INSERT INTO reflections(success, low_point, take_away, owner_id)
          VALUES
            ($1, $2, $3, $4);
        `,
        [this.success, this.low_point, this.take_away, this.owner_id]
      );
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  /**
   *
   * @param {number} ownerId
   * @return {Promise<{success: boolean, result: reflectionRow[], error?: Error}>}
   */
  static async findByOwnerId(ownerId) {
    try {
      const queryResult = await pool.query(
        `
          SELECT id, success, low_point, take_away, owner_id, created_date, modified_date
          FROM reflections
          WHERE owner_id = $1;
      `,
        [ownerId]
      );
      return { success: true, result: queryResult.rows };
    } catch (error) {
      return { success: false, error };
    }
  }

  /**
   *
   * @param {number} reflectionId
   * @param {Reflection} reflection
   * @return {Promise<{success: boolean, error?: Error}>}
   */
  static async update(reflectionId, reflection) {
    try {
      await pool.query(
        `
        UPDATE reflections
        SET 
          success = $1,
          low_point = $2, 
          take_away = $3, 
          owner_id = $4,
          modified_date = NOW()
        WHERE
          id = $5
      `,
        [
          reflection.success,
          reflection.low_point,
          reflection.take_away,
          reflection.owner_id,
          reflectionId,
        ]
      );
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  /**
   *
   * @param {number} reflectionId
   * @return {Promise<{success: boolean, error?: Error}>}
   */
  static async delete(reflectionId) {
    try {
      await pool.query(
        `
          DELETE FROM reflections WHERE id = $1
      `,
        [reflectionId]
      );
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}

module.exports = Reflection;