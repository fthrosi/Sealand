import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { CustomRequest } from "../../middleware/auth.js";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      const { accessToken, refreshToken, payload } = result.data;

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
        path: "/",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: "/",
      });
      res.cookie("payload", JSON.stringify(payload), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: "/",
      });
      return res.status(200).json({
        success: true,
        message: result.message,
        data: payload,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat login",
      });
    }
  }

  async logout(req: CustomRequest, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // If refresh token exists, delete only this device's token
      if (refreshToken) {
        await this.authService.verifyAndDeleteRefreshToken(
          userId,
          refreshToken,
        );
      }

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as const,
        path: "/",
      };

      res.clearCookie("accessToken", cookieOptions);
      res.clearCookie("refreshToken", cookieOptions);
      res.clearCookie("payload", cookieOptions);
      return res.status(200).json({
        success: true,
        message: "Logout berhasil dari device ini",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat logout",
      });
    }
  }

  async logoutAll(req: CustomRequest, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      await this.authService.deleteAllUserTokens(userId);
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("payload");
      return res.status(200).json({
        success: true,
        message: "Logout berhasil dari semua device",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat logout",
      });
    }
  }
  async refresh(req: Request, res: Response) {
    try {
      // Ambil data dari cookies
      const { refreshToken, payload } = req.cookies;

      if (!refreshToken || !payload) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const result = await this.authService.refreshToken(
        refreshToken,
        payload,
      );

      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 5 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        success: true,
        data: result.payload,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid session" });
    }
  }
}
