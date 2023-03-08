import React, { Component } from "react"
import { Features } from "../@types/shared"
import Art from "../models/Art"

const artApiBaseUrl = "https://localhost:7108"

export class ArtRepository {
  public static async getArts(): Promise<Art[]> {
    const url = `${artApiBaseUrl}/api/arts?artType=${Features.Txt2Img}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Cannot get request")
    }
    const responseJson = await response.json()

    const mappedArts = responseJson?.data.map((artJson: any) => {
      const art = new Art(artJson.title, false)
      return art
    })
    return mappedArts
  }
}
